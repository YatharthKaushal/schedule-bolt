import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-0">
      <div className="container flex flex-col md:flex-row md:h-24 items-center justify-between gap-4 md:gap-0">
        <p className="text-sm text-muted-foreground">
          © 2025 Schedulr. All rights reserved.
        </p>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}