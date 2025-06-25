'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CalendarViewProps {
  currentMonth: Date
}

// Demo session data
const sessionEvents = [
  {
    id: '1',
    date: '2025-06-05',
    time: '10:00',
    hostName: 'Bob Johnson',
    status: 'scheduled',
  },
  {
    id: '2',
    date: '2025-06-10',
    time: '14:00',
    hostName: 'Sarah Williams',
    status: 'scheduled',
  },
  {
    id: '3',
    date: '2025-05-28',
    time: '11:00',
    hostName: 'David Chen',
    status: 'completed',
  },
  {
    id: '4',
    date: '2025-05-30',
    time: '09:00',
    hostName: 'Michelle Rodriguez',
    status: 'cancelled',
  },
]

export function CalendarView({ currentMonth }: CalendarViewProps) {
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    // Create date for first day of the month
    const firstDay = new Date(year, month, 1)
    
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const startingDayOfWeek = firstDay.getDay()
    
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    
    // Array to store calendar days
    const calendarDays = []
    
    // Add days from previous month to fill the first week
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i
      calendarDays.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        events: []
      })
    }
    
    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateString = date.toISOString().split('T')[0]
      
      // Find events for this day
      const dayEvents = sessionEvents.filter(event => event.date === dateString)
      
      calendarDays.push({
        date,
        isCurrentMonth: true,
        events: dayEvents
      })
    }
    
    // Add days from next month to complete the last week
    const lastWeekDay = lastDay.getDay()
    const daysToAdd = 6 - lastWeekDay
    for (let day = 1; day <= daysToAdd; day++) {
      calendarDays.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        events: []
      })
    }
    
    return calendarDays
  }
  
  const calendarDays = generateCalendarDays()
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="grid grid-cols-7 gap-px bg-border">
          {/* Week day headers */}
          {weekDays.map((day) => (
            <div 
              key={day} 
              className="bg-background p-2 text-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {calendarDays.map((day, index) => {
            const isToday = 
              new Date().toDateString() === day.date.toDateString()
            
            return (
              <div 
                key={index}
                className={cn(
                  "h-28 p-1 bg-background border-b border-r hover:bg-accent/5 transition-colors",
                  !day.isCurrentMonth && "opacity-50 bg-muted/30"
                )}
              >
                <div className="flex justify-between items-start h-full flex-col">
                  <div className={cn(
                    "w-full text-right p-1",
                    isToday && "font-bold text-primary"
                  )}>
                    <span className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs",
                      isToday && "bg-primary text-primary-foreground"
                    )}>
                      {day.date.getDate()}
                    </span>
                  </div>
                  
                  <div className="flex-1 w-full overflow-y-auto space-y-1 pb-1">
                    {day.events.map((event) => (
                      <Card 
                        key={event.id} 
                        className={cn(
                          "p-1 text-xs cursor-pointer transition-colors hover:bg-accent/10",
                          event.status === 'scheduled' ? 'border-green-200 dark:border-green-900/40 bg-green-50/50 dark:bg-green-900/20' :
                          event.status === 'completed' ? 'border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-900/20' :
                          'border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-900/20'
                        )}
                      >
                        <div className="font-medium truncate">{event.time}</div>
                        <div className="truncate">{event.hostName}</div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}