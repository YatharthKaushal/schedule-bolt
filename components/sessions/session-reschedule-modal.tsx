'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface SessionRescheduleModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  session: any
}

// Demo available times
const availableTimes = {
  '2025-06-07': ['09:00', '10:00', '11:00', '14:00', '15:00'],
  '2025-06-08': ['10:00', '13:00', '14:00', '16:00'],
  '2025-06-09': ['09:00', '11:00', '13:00', '15:00', '16:00'],
}

export function SessionRescheduleModal({ 
  isOpen, 
  onOpenChange,
  session
}: SessionRescheduleModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  
  // Format date for data lookup
  const formattedDate = selectedDate ? 
    selectedDate.toISOString().split('T')[0] : 
    ''
    
  // Get available times for the selected date
  const timesForSelectedDate = 
    availableTimes[formattedDate as keyof typeof availableTimes] || []
  
  const handleReschedule = () => {
    if (!selectedDate || !selectedTime) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      
      // Reset form
      setSelectedDate(undefined)
      setSelectedTime(null)
    }, 1500)
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reschedule Session</DialogTitle>
          <DialogDescription>
            Select a new date and time for your session.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={{ 
                before: new Date(),
                after: new Date(new Date().setDate(new Date().getDate() + 30)) // 30 days from now
              }}
            />
          </div>
          
          {selectedDate && (
            <div className="space-y-4">
              <Label>Select a new time</Label>
              {timesForSelectedDate.length > 0 ? (
                <RadioGroup value={selectedTime || ''} onValueChange={setSelectedTime}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timesForSelectedDate.map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <RadioGroupItem value={time} id={`time-${time}`} />
                        <Label htmlFor={`time-${time}`} className="cursor-pointer">
                          {time}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              ) : (
                <p className="text-center py-4 text-muted-foreground">
                  No available times for this date
                </p>
              )}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleReschedule} 
            disabled={!selectedDate || !selectedTime || isSubmitting}
          >
            {isSubmitting ? 'Rescheduling...' : 'Confirm Reschedule'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}