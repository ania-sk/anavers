import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

// ─── Walidacja po stronie serwera ─────────────────────────────────────────────
function validate(payload: ContactPayload): string | null {
  const { name, email, message } = payload;

  // trim() usuwa białe znaki z początku i końca — "   " nie przejdzie jako imię
  if (!name || name.trim().length < 2) {
    return "Name must be at least 2 characters long.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return "Invalid email address.";
  }

  if (!message || message.trim().length < 10) {
    return "Message must be at least 10 characters long.";
  }

  return null;
}

// ─── Sanityzacja HTML ─────────────────────────────────────────────────────────
function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ─── Handler POST ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { name, email, message } = body;

    const validationError = validate({ name, email, message });
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const safeName = sanitize(name.trim());
    const safeEmail = sanitize(email.trim());
    const safeMessage = sanitize(message.trim());

    // ── Wysyłka przez Resend ─────────────────────────────────────────────────
    const { error: resendError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL!],
      subject: `Nowa wiadomość od ${safeName} | anavers.pl`,
      replyTo: safeEmail,
      html: `
        <!DOCTYPE html>
        <html lang="pl">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f7f4; font-family: sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                  style="background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden;">

                  <!-- Nagłówek -->
                  <tr>
                    <td style="background: #8A4AD3; padding: 32px 40px;">
                      <p style="margin: 0; color: #ffffff; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-family: monospace;">
                        anavers.pl — formularz kontaktowy
                      </p>
                      <h1 style="margin: 8px 0 0; color: #ffffff; font-size: 22px; font-weight: 700;">
                        Nowa wiadomość
                      </h1>
                    </td>
                  </tr>

                  <!-- Dane nadawcy -->
                  <tr>
                    <td style="padding: 32px 40px 0;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 4px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; font-family: monospace;">
                              Imię
                            </p>
                            <p style="margin: 0; font-size: 16px; color: #111111; font-weight: 600;">
                              ${safeName}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 4px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; font-family: monospace;">
                              Email
                            </p>
                            <a href="mailto:${safeEmail}"
                              style="margin: 0; font-size: 16px; color: #8A4AD3; text-decoration: none; font-weight: 600;">
                              ${safeEmail}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Treść wiadomości -->
                  <tr>
                    <td style="padding: 24px 40px 0;">
                      <p style="margin: 0 0 12px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; font-family: monospace;">
                        Wiadomość
                      </p>
                      <div style="background: #f8f7f4; border-left: 3px solid #8A4AD3; border-radius: 0 8px 8px 0; padding: 20px 24px;">
                        <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.7; white-space: pre-wrap;">
                          ${safeMessage}
                        </p>
                      </div>
                    </td>
                  </tr>

                  <!-- Stopka -->
                  <tr>
                    <td style="padding: 32px 40px;">
                      <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
                        Wiadomość wysłana przez formularz kontaktowy na
                        <a href="https://anavers.pl" style="color: #8A4AD3; text-decoration: none;">anavers.pl</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    // ── Obsługa błędu Resend ─────────────────────────────────────────────────
    if (resendError) {
      console.error("[contact/route] Resend API error:", resendError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 },
      );
    }

    // ── Sukces ───────────────────────────────────────────────────────────────
    return NextResponse.json(
      { message: "Email sent successfully." },
      { status: 200 },
    );
  } catch (err) {
    // ── Nieoczekiwane błędy ──────────────────────────────────────────────────
    console.error("[contact/route] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
