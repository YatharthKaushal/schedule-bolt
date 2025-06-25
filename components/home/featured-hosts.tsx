'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

// Demo hosts data
const featuredHosts = [
  {
    id: '1',
    name: 'Bob Johnson',
    bio: 'Experienced software engineer specializing in JavaScript and React.',
    specialties: ['JavaScript', 'React', 'Web Development'],
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    bio: 'Career coach with 8+ years of experience in tech industry recruiting.',
    specialties: ['Career Advice', 'Resume Review', 'Interview Prep'],
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '3',
    name: 'David Chen',
    bio: 'Product manager at a Fortune 500 company with expertise in agile methodologies.',
    specialties: ['Product Management', 'Agile', 'User Research'],
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '4',
    name: 'Michelle Rodriguez',
    bio: 'UX/UI designer with a background in cognitive psychology.',
    specialties: ['UX Design', 'UI Design', 'User Testing'],
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
]

export function FeaturedHosts() {
  const [visibleHosts, setVisibleHosts] = useState(3)
  
  const handleShowMore = () => {
    setVisibleHosts(prev => Math.min(prev + 3, featuredHosts.length))
  }
  
  return (
    <section className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold leading-tight">Featured Hosts</h2>
          <p className="text-muted-foreground mt-2">Book sessions with our top-rated experts</p>
        </div>
        <Button variant="outline" size="sm" className="mt-4 md:mt-0" asChild>
          <Link href="/hosts">View All Hosts</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredHosts.slice(0, visibleHosts).map(host => (
          <Card key={host.id} className="overflow-hidden border-border/40 transition-all duration-300 hover:shadow-md">
            <CardHeader className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={host.imageUrl} alt={host.name} />
                  <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{host.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {host.bio}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex flex-wrap gap-2">
                {host.specialties.map(specialty => (
                  <Badge key={specialty} variant="secondary">{specialty}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button variant="outline" size="sm" className="w-full group" asChild>
                <Link href={`/hosts/${host.id}`}>
                  View Availability
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {visibleHosts < featuredHosts.length && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={handleShowMore}>
            Show More Hosts
          </Button>
        </div>
      )}
    </section>
  )
}