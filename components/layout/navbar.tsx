'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Menu, Moon, Sun, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const NavItems = () => (
    <>
      <Link href="/hosts" className="text-sm font-medium transition-colors hover:text-primary">
        Find Hosts
      </Link>
      <Link href="/sessions" className="text-sm font-medium transition-colors hover:text-primary">
        My Sessions
      </Link>
      <Link href="/calendar" className="text-sm font-medium transition-colors hover:text-primary">
        Calendar
      </Link>
    </>
  )

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md" 
          : "bg-background"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">Schedulr</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavItems />
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="mr-2"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          
          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <NavItems />
                <div className="h-px bg-border mt-2 mb-2" />
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link href="/sign-in" onClick={() => setIsOpen(false)}>Sign In</Link>
                </Button>
                <Button size="sm" className="justify-start" asChild>
                  <Link href="/sign-up" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}