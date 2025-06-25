'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { CalendarClock, ExternalLink, Video } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface ListViewSessionsProps {
  currentMonth: Date
}

// Demo session data
const sessionEvents = [
  {
    id: '1',
    date: '2025-06-05',
    time: '10:00',
    hostId: '1',
    hostName: 'Bob Johnson',
    hostImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    meetingLink: 'https://zoom.us/j/1234567890',
    status: 'scheduled'
  },
  {
    id: '2',
    date: '2025-06-10',
    time: '14:00',
    hostId: '2',
    hostName: 'Sarah Williams',
    hostImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    meetingLink: 'https://zoom.us/j/0987654321',
    status: 'scheduled'
  },
  {
    id: '3',
    date: '2025-05-28',
    time: '11:00',
    hostId: '3',
    hostName: 'David Chen',
    hostImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    meetingLink: 'https://zoom.us/j/5432167890',
    status: 'completed'
  },
  {
    id: '4',
    date: '2025-05-30',
    time: '09:00',
    hostId: '4',
    hostName: 'Michelle Rodriguez',
    hostImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'cancelled'
  }
]

export function ListViewSessions({ currentMonth }: ListViewSessionsProps) {
  // Filter sessions for the current month
  const filteredSessions = sessionEvents.filter(session => {
    const sessionDate = new Date(session.date)
    return (
      sessionDate.getMonth() === currentMonth.getMonth() &&
      sessionDate.getFullYear() === currentMonth.getFullYear()
    )
  })
  
  // Group sessions by date
  const groupedSessions = filteredSessions.reduce((acc: Record<string, any[]>, session) => {
    if (!acc[session.date]) {
      acc[session.date] = []
    }
    acc[session.date].push(session)
    return acc
  }, {})
  
  // Sort dates
  const sortedDates = Object.keys(groupedSessions).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime()
  })
  
  if (sortedDates.length === 0) {
    return (
      <Card className="border-border/40 bg-muted/20">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CalendarClock className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg mb-2">No sessions this month</h3>
          <p className="text-muted-foreground mb-6">
            You don't have any sessions scheduled for {currentMonth.toLocaleDateString('en-US', { month: 'long' })}
          </p>
          <Button asChild>
            <Link href="/hosts">Find Hosts</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <div className="space-y-8">
      {sortedDates.map(date => {
        const sessionDate = new Date(date)
        const formattedDate = sessionDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        })
        
        const sessions = groupedSessions[date]
        
        return (
          <div key={date} className="space-y-4">
            <h3 className="font-medium">{formattedDate}</h3>
            <div className="space-y-3">
              {sessions.map(session => (
                <Card key={session.id} className={cn(
                  "border-l-4 transition-all duration-300 hover:shadow-sm",
                  session.status === 'scheduled' ? 'border-l-green-500' :
                  session.status === 'completed' ? 'border-l-blue-500' :
                  'border-l-red-500'
                )}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={session.hostImage} alt={session.hostName} />
                          <AvatarFallback>{session.hostName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h4 className="font-medium">{session.hostName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {session.time} (30 minutes)
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={
                          session.status === 'scheduled' ? 'text-green-500 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900/30' :
                          session.status === 'completed' ? 'text-blue-500 border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-900/30' :
                          'text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900/30'
                        }>
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </Badge>
                        
                        {session.status === 'scheduled' && session.meetingLink && (
                          <Button variant="outline" size="sm" className="gap-1 text-xs h-8" asChild>
                            <a href={"session.meetingLink"} target="_blank" rel="noopener noreferrer">
                              <Video className="h-3 w-3" />
                              Join
                              <ExternalLink className="h-2 w-2 ml-1" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {sortedDates.indexOf(date) < sortedDates.length - 1 && <Separator />}
          </div>
        )
      })}
    </div>
  )
}

// This fix is needed due to next/link requiring client components when used with onClick handlers
import Link from 'next/link'