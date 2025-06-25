import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CalendarCheck, Check } from 'lucide-react'

interface BookingConfirmationProps {
  date: string
  time: string
  onClose: () => void
}

export function BookingConfirmation({ date, time, onClose }: BookingConfirmationProps) {
  return (
    <>
      <DialogHeader>
        <div className="flex flex-col items-center text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CalendarCheck className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl">Booking Confirmed!</DialogTitle>
        </div>
      </DialogHeader>
      
      <div className="flex flex-col items-center py-6">
        <p className="mb-4 text-center">
          Your session has been booked for <strong>{date}</strong> at <strong>{time}</strong>
        </p>
        
        <ul className="space-y-3 text-sm my-4">
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>A confirmation email has been sent to your inbox</span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>The Zoom meeting link will be sent 1 hour before the session</span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>You can reschedule or cancel up to 12 hours before the session</span>
          </li>
        </ul>
      </div>
      
      <DialogFooter>
        <Button onClick={onClose} className="w-full">
          Done
        </Button>
      </DialogFooter>
    </>
  )
}