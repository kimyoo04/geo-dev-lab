'use client'

import { useDeleteUser } from '@/features/user/api/delete-user'

import { Button } from '@/shared/components/ui/button'
import { ConfirmationDialog } from '@/shared/components/ui/dialog'
import { useNotifications } from '@/shared/components/ui/notifications'

type DeleteUserProps = {
  id: string
}

export const DeleteUser = ({ id }: DeleteUserProps) => {
  const { addNotification } = useNotifications()
  const deleteUserMutation = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'User Deleted',
        })
      },
    },
  })

  // if (user.data?.id === id) return null

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete User"
      body="Are you sure you want to delete this user?"
      triggerButton={<Button variant="destructive">Delete</Button>}
      confirmButton={
        <Button
          isLoading={deleteUserMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() => deleteUserMutation.mutate({ userId: id })}
        >
          Delete User
        </Button>
      }
    />
  )
}
