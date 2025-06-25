'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, List, Plus } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarView } from '@/components/calendar/calendar-view'
import { ListViewSessions } from '@/components/calendar/list-view-sessions'

export default function CalendarPage() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }
  
  return (
    <div className="container py-8">
      <Card className="border-border/40 shadow-sm">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>My Calendar</CardTitle>
              <CardDescription>
                Manage your scheduled sessions
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Tabs 
                defaultValue="calendar" 
                value={view} 
                onValueChange={(v) => setView(v as 'calendar' | 'list')}
                className="w-full sm:w-[200px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="calendar" className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger value="list" className="flex items-center gap-1">
                    <List className="h-4 w-4" />
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button className="w-full sm:w-auto" asChild>
                <Link href="/hosts">
                  <Plus className="h-4 w-4 mr-1" />
                  Book Session
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <h2 className="font-medium">
              {currentMonth.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </h2>
            
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className={cn(
          "p-0 sm:p-4",
          view === 'list' ? "pt-0" : "overflow-x-auto"
        )}>
          {view === 'calendar' ? (
            <CalendarView currentMonth={currentMonth} />
          ) : (
            <ListViewSessions currentMonth={currentMonth} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// This fix is needed due to next/link requiring client components when used with onClick handlers
import Link from 'next/link'