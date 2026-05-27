"use client";

import { CheckCircle } from "lucide-react";

interface ContactSuccessProps {
  // Tłumaczenia są wykonywane w rodzicu (ContactForm) i przekazywane tu jako props.
  successMessage: string;
  sendAnotherLabel: string;
  onReset: () => void;
}

// Ten komponent to czysty "presentational component":
//   - Tylko: props wejściowe → HTML wyjściowy

export default function ContactSuccess({
  successMessage,
  sendAnotherLabel,
  onReset,
}: ContactSuccessProps) {
  return (
    <div className="text-center py-8 space-y-4">
      {/* Okrągła ikona ze znacznikiem — wizualne potwierdzenie sukcesu */}
      <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto">
        <CheckCircle size={28} />
      </div>

      {/* Tekst komunikatu — pochodzi z tłumaczeń, przekazany przez rodzica */}
      <h3 className="text-lg font-bold text-text-primary">{successMessage}</h3>

      {/* Przycisk resetujący formularz — wywołuje callback z rodzica */}
      <button
        onClick={onReset}
        className="text-xs font-mono text-accent hover:underline pt-2"
      >
        {sendAnotherLabel}
      </button>
    </div>
  );
}
