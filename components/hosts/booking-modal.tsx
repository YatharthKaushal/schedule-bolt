'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { BookingConfirmation } from '@/components/hosts/booking-confirmation'

interface BookingModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  date: Date | undefined
  time: string | null
  hostId: string
}

export function BookingModal({ isOpen, onOpenChange, date, time, hostId }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsConfirmed(true)
    }, 1500)
  }
  
  // Format date for display
  const formattedDate = date ? 
    date.toLocaleDateString('en-US', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }) : ''
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {!isConfirmed ? (
          <>
            <DialogHeader>
              <DialogTitle>Book a Session</DialogTitle>
              <DialogDescription>
                Complete the form to schedule your session.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <Card className="border-border/40 bg-muted/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Session Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{time}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>30 minutes</span>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="topic">What would you like to discuss?</Label>
                  <Textarea 
                    id="topic" 
                    name="topic" 
                    rows={3}
                    value={formData.topic}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <BookingConfirmation 
            date={formattedDate} 
            time={time || ''} 
            onClose={() => {
              setIsConfirmed(false)
              onOpenChange(false)
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}