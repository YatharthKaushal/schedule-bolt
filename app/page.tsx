import Link from 'next/link'
import { ArrowRight, CalendarClock, Clock, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedHosts } from '@/components/home/featured-hosts'

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <HeroSection />
      
      <section className="container py-8 md:py-12">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Book sessions with experts in just a few clicks
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="space-y-1 flex md:min-h-[100px] items-start">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Choose a Host</CardTitle>
              <CardDescription>Find the perfect expert for your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Browse through our selection of professional hosts and find the one that matches your requirements.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="space-y-1 flex md:min-h-[100px] items-start">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CalendarClock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Select a Time Slot</CardTitle>
              <CardDescription>View available times that work for you</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Check the host's calendar to find and book an available time slot that fits your schedule.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="space-y-1 flex md:min-h-[100px] items-start">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Attend Your Session</CardTitle>
              <CardDescription>Get a Zoom link automatically</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Receive automatic confirmation with Zoom meeting details. Join your session at the scheduled time.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="group">
            <Link href="/hosts">
              Find Hosts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
      
      <FeaturedHosts />
      
      <section className="container py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-[58rem] flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Ready to Connect?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Start booking sessions with experts today
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Create Account
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/hosts">
                Browse Hosts
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}