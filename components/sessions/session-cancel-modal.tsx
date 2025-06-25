'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface SessionCancelModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  session: any
}

export function SessionCancelModal({
  isOpen,
  onOpenChange,
  session
}: SessionCancelModalProps) {
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleCancel = () => {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      setReason('') // Reset form
    }, 1500)
  }
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Session</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel this session? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4">
          <Label htmlFor="cancel-reason" className="mb-2 block">
            Reason for cancellation (optional)
          </Label>
          <Textarea
            id="cancel-reason"
            placeholder="Please provide a reason for cancellation..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
          />
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>
            Nevermind
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={isSubmitting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isSubmitting ? 'Cancelling...' : 'Yes, Cancel Session'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}