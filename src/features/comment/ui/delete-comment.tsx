'use client'

import { Trash } from 'lucide-react'

import { useDeleteComment } from '@/features/comment/api/delete-comment'

import { Button } from '@/shared/components/ui/button'
import { ConfirmationDialog } from '@/shared/components/ui/dialog'
import { useNotifications } from '@/shared/components/ui/notifications'

type DeleteCommentProps = {
  id: string
  discussionId: string
}

export const DeleteComment = ({ id, discussionId }: DeleteCommentProps) => {
  const { addNotification } = useNotifications()
  const deleteCommentMutation = useDeleteComment({
    discussionId,
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Comment Deleted',
        })
      },
    },
  })

  return (
    <ConfirmationDialog
      isDone={deleteCommentMutation.isSuccess}
      icon="danger"
      title="Delete Comment"
      body="Are you sure you want to delete this comment?"
      triggerButton={
        <Button variant="destructive" size="sm" icon={<Trash className="size-4" />}>
          Delete Comment
        </Button>
      }
      confirmButton={
        <Button
          isLoading={deleteCommentMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() => deleteCommentMutation.mutate({ commentId: id })}
        >
          Delete Comment
        </Button>
      }
    />
  )
}
