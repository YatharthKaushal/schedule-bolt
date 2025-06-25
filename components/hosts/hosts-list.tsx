'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Calendar, Star } from 'lucide-react'

// Demo hosts data
const allHosts = [
  {
    id: '1',
    name: 'Bob Johnson',
    bio: 'Experienced software engineer specializing in JavaScript and React.',
    specialties: ['JavaScript', 'React', 'Web Development'],
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    reviewCount: 128
  },
  {
    id: '2',
    name: 'Sarah Williams',
    bio: 'Career coach with 8+ years of experience in tech industry recruiting.',
    specialties: ['Career Advice', 'Resume Review', 'Interview Prep'],
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    reviewCount: 97
  },
  {
    id: '3',
    name: 'David Chen',
    bio: 'Product manager at a Fortune 500 company with expertise in agile methodologies.',
    specialties: ['Product Management', 'Agile', 'User Research'],
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    reviewCount: 84
  },
  {
    id: '4',
    name: 'Michelle Rodriguez',
    bio: 'UX/UI designer with a background in cognitive psychology.',
    specialties: ['UX Design', 'UI Design', 'User Testing'],
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    reviewCount: 112
  },
  {
    id: '5',
    name: 'James Wilson',
    bio: 'Backend developer specializing in Node.js, Python and distributed systems.',
    specialties: ['Node.js', 'Python', 'System Design'],
    imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    reviewCount: 76
  },
  {
    id: '6',
    name: 'Emily Johnson',
    bio: 'Data scientist with expertise in machine learning and predictive analytics.',
    specialties: ['Data Science', 'Machine Learning', 'Python'],
    imageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    reviewCount: 91
  }
]

export function HostsList() {
  const [hosts, setHosts] = useState(allHosts)
  const [visibleHosts, setVisibleHosts] = useState(4)
  
  const handleShowMore = () => {
    setVisibleHosts(prev => Math.min(prev + 4, hosts.length))
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {Math.min(visibleHosts, hosts.length)} of {hosts.length} hosts
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Latest
          </Button>
          <Button variant="outline" size="sm">
            Popular
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hosts.slice(0, visibleHosts).map((host) => (
          <Card key={host.id} className="overflow-hidden border-border/40 transition-all duration-300 hover:shadow-md">
            <CardHeader className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={host.imageUrl} alt={host.name} />
                  <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{host.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                      <span>{host.rating} ({host.reviewCount})</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {host.bio}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex flex-wrap gap-2">
                {host.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">{specialty}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <Link href={`/hosts/${host.id}`}>
                  <Calendar className="h-4 w-4" />
                  View Schedule
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="group" asChild>
                <Link href={`/hosts/${host.id}`}>
                  Profile
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {visibleHosts < hosts.length && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={handleShowMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}