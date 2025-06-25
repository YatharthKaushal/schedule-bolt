import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative pb-12 pt-24 md:pt-32">
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-background/10 via-background/50 to-background"></div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Schedule Sessions <span className="text-primary">Effortlessly</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Connect with hosts, book sessions, and get meeting links — all in one place.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="group">
              <Link href="/hosts">
                Browse Hosts
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sign-up">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}