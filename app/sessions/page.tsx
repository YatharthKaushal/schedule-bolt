import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SessionsList } from '@/components/sessions/sessions-list'

export default function SessionsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">My Sessions</h1>
        <p className="text-muted-foreground">
          Manage your upcoming and past sessions
        </p>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full max-w-[400px] mb-6">
          <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
          <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
          <TabsTrigger value="cancelled" className="flex-1">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <SessionsList type="upcoming" />
        </TabsContent>
        
        <TabsContent value="past">
          <SessionsList type="past" />
        </TabsContent>
        
        <TabsContent value="cancelled">
          <SessionsList type="cancelled" />
        </TabsContent>
      </Tabs>
    </div>
  )
}