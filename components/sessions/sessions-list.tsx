'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, ExternalLink, MoreVertical, Pencil, Trash2, Video } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useState } from 'react'
import { SessionRescheduleModal } from '@/components/sessions/session-reschedule-modal'
import { SessionCancelModal } from '@/components/sessions/session-cancel-modal'

interface SessionsListProps {
  type: 'upcoming' | 'past' | 'cancelled'
}

// Demo sessions data
const sessionData = {
  upcoming: [
    {
      id: '1',
      hostId: '1',
      hostName: 'Bob Johnson',
      hostImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2025-06-05',
      time: '10:00',
      meetingLink: 'https://zoom.us/j/1234567890',
      status: 'scheduled'
    },
    {
      id: '2',
      hostId: '2',
      hostName: 'Sarah Williams',
      hostImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2025-06-10',
      time: '14:00',
      meetingLink: 'https://zoom.us/j/0987654321',
      status: 'scheduled'
    }
  ],
  past: [
    {
      id: '3',
      hostId: '3',
      hostName: 'David Chen',
      hostImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2025-05-28',
      time: '11:00',
      meetingLink: 'https://zoom.us/j/5432167890',
      status: 'completed'
    }
  ],
  cancelled: [
    {
      id: '4',
      hostId: '4',
      hostName: 'Michelle Rodriguez',
      hostImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2025-05-30',
      time: '09:00',
      status: 'cancelled'
    }
  ]
}

export function SessionsList({ type }: SessionsListProps) {
  const sessions = sessionData[type] || []
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  
  const handleReschedule = (session: any) => {
    setSelectedSession(session)
    setIsRescheduleModalOpen(true)
  }
  
  const handleCancel = (session: any) => {
    setSelectedSession(session)
    setIsCancelModalOpen(true)
  }
  
  if (sessions.length === 0) {
    return (
      <Card className="border-border/40 bg-muted/20">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">No {type} sessions found</p>
          {type === 'upcoming' && (
            <Button asChild>
              <Link href="/hosts">Find Hosts</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }
  
  return (
    <div className="space-y-6">
      {sessions.map((session) => {
        const sessionDate = new Date(session.date)
        const formattedDate = sessionDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
        
        return (
          <Card key={session.id} className="overflow-hidden border-border/40 transition-all duration-300 hover:shadow-sm">
            <CardHeader className="p-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={session.hostImage} alt={session.hostName} />
                    <AvatarFallback>{session.hostName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{session.hostName}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="outline" className={
                        session.status === 'scheduled' ? 'text-green-500 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900/30' :
                        session.status === 'completed' ? 'text-blue-500 border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-900/30' :
                        'text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900/30'
                      }>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {type === 'upcoming' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleReschedule(session)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Reschedule
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleCancel(session)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="px-6 pb-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{session.time} (30 minutes)</span>
                </div>
              </div>
              
              {session.status === 'scheduled' && (
                <CardFooter className="px-0 pt-4">
                  <Button className="w-full sm:w-auto gap-2" asChild>
                    <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">
                      <Video className="h-4 w-4" />
                      Join Zoom Meeting
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </CardFooter>
              )}
            </CardContent>
          </Card>
        )
      })}
      
      <SessionRescheduleModal 
        isOpen={isRescheduleModalOpen}
        onOpenChange={setIsRescheduleModalOpen}
        session={selectedSession}
      />
      
      <SessionCancelModal
        isOpen={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        session={selectedSession}
      />
    </div>
  )
}