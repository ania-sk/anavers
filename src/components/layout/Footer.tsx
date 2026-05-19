export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-24">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Ania Sk
        </p>
        <p className="text-sm text-text-muted">Built with Next.js</p>
      </div>
    </footer>
  );
}
