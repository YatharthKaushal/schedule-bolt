'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookingModal } from '@/components/hosts/booking-modal'
import { cn } from '@/lib/utils'

interface HostCalendarProps {
  hostId: string
}

// Demo availability data
const availabilityData = {
  '2025-06-05': [
    { time: '10:00', available: false },
    { time: '11:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true }
  ],
  '2025-06-06': [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true }
  ],
  '2025-06-07': [
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '13:00', available: true },
    { time: '14:00', available: true }
  ]
}

export function HostCalendar({ hostId }: HostCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date('2025-06-05'))
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [view, setView] = useState<'day' | 'month'>('day')
  
  // Format the date to match our data structure
  const formattedDate = selectedDate ? 
    selectedDate.toISOString().split('T')[0] : 
    new Date().toISOString().split('T')[0]
  
  // Get available times for the selected date
  const availableSlots = availabilityData[formattedDate as keyof typeof availabilityData] || []
  
  // Handle date selection in calendar
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTime(null) // Reset selected time when date changes
  }
  
  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }
  
  // Handle booking initiation
  const handleBookNow = () => {
    setIsBookingModalOpen(true)
  }
  
  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Schedule a Session</CardTitle>
            <CardDescription>Choose a date and time that works for you</CardDescription>
          </div>
          <Tabs 
            defaultValue="day" 
            value={view} 
            onValueChange={(v) => setView(v as 'day' | 'month')}
            className="w-[180px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="order-2 lg:order-1">
            {view === 'day' ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">
                    {selectedDate?.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        className={cn(
                          "w-full justify-center",
                          !slot.available && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={!slot.available}
                        onClick={() => handleTimeSelect(slot.time)}
                      >
                        {slot.time}
                      </Button>
                    ))
                  ) : (
                    <p className="col-span-full text-center py-6 text-muted-foreground">
                      No available slots for this date
                    </p>
                  )}
                </div>
                
                {selectedTime && (
                  <div className="pt-4">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleBookNow}
                    >
                      Book for {selectedTime}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center pt-4 pb-8">
                <p className="text-muted-foreground text-center max-w-[80%]">
                  Select a date from the calendar to view available time slots
                </p>
              </div>
            )}
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <Calendar 
              mode="single" 
              selected={selectedDate} 
              onSelect={handleDateSelect} 
              className="rounded-md border shadow"
              disabled={{ before: new Date() }}
            />
          </div>
        </div>
      </CardContent>
      
      <BookingModal 
        isOpen={isBookingModalOpen}
        onOpenChange={setIsBookingModalOpen}
        date={selectedDate}
        time={selectedTime}
        hostId={hostId}
      />
    </Card>
  )
}