'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Filter, X } from 'lucide-react'
import { 
  Sheet, 
  SheetContent,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet'

const specialties = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'react', label: 'React' },
  { id: 'design', label: 'UX/UI Design' },
  { id: 'product', label: 'Product Management' },
  { id: 'career', label: 'Career Advice' },
  { id: 'backend', label: 'Backend Development' },
  { id: 'data', label: 'Data Science' },
  { id: 'mobile', label: 'Mobile Development' },
]

export function HostsFilter() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Check viewport width to determine if mobile
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])
  
  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Search</h3>
        <Input placeholder="Search hosts..." />
      </div>
      
      <Separator />
      
      <Accordion type="multiple" defaultValue={['specialties']}>
        <AccordionItem value="specialties">
          <AccordionTrigger className="text-base">Specialties</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {specialties.map((specialty) => (
                <div key={specialty.id} className="flex items-center space-x-2">
                  <Checkbox id={`specialty-${specialty.id}`} />
                  <Label htmlFor={`specialty-${specialty.id}`} className="text-sm font-normal cursor-pointer">
                    {specialty.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="availability">
          <AccordionTrigger className="text-base">Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="today" />
                <Label htmlFor="today" className="text-sm font-normal cursor-pointer">
                  Available Today
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tomorrow" />
                <Label htmlFor="tomorrow" className="text-sm font-normal cursor-pointer">
                  Available Tomorrow
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="this-week" />
                <Label htmlFor="this-week" className="text-sm font-normal cursor-pointer">
                  Available This Week
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="pt-4 flex flex-col gap-2">
        <Button>Apply Filters</Button>
        <Button variant="outline">Reset Filters</Button>
      </div>
    </div>
  )
  
  // For mobile: render a sheet
  if (isMobile) {
    return (
      <>
        <div className="flex items-center justify-between mb-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Filters</h2>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>
              <FilterContent />
            </SheetContent>
          </Sheet>
        </div>
      </>
    )
  }
  
  // For desktop: render the sidebar
  return (
    <div className="sticky top-20 border rounded-lg p-4 space-y-6 bg-card">
      <h2 className="font-medium text-lg">Filters</h2>
      <FilterContent />
    </div>
  )
}