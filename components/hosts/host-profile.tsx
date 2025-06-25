import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Globe, Info, Mail, Star } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface HostProfileProps {
  host: {
    name: string
    bio: string
    specialties: string[]
    imageUrl: string
    rating: number
    reviewCount: number
    sessionRate: string
    sessionLength: string
    location: string
  }
}

export function HostProfile({ host }: HostProfileProps) {
  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader className="pt-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={host.imageUrl} alt={host.name} />
            <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">{host.name}</CardTitle>
          
          <div className="flex items-center mt-2">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
            <span className="font-medium mr-1">{host.rating}</span>
            <span className="text-sm text-muted-foreground">({host.reviewCount} reviews)</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{host.bio}</p>
        
        <Separator />
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Session Length</span>
            </div>
            <span className="font-medium">{host.sessionLength}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>Location</span>
            </div>
            <span className="font-medium">{host.location}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span>Rate</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fee per session</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="font-medium">{host.sessionRate}</span>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {host.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary">{specialty}</Badge>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <Button className="w-full" variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Contact Host
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}