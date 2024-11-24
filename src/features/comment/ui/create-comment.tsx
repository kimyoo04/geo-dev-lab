'use client'

import { Plus } from 'lucide-react'

import { createCommentInputSchema, useCreateComment } from '@/features/comment/api/create-comment'

import { Button } from '@/shared/components/ui/button'
import { Form, FormDrawer, Textarea } from '@/shared/components/ui/form'
import { useNotifications } from '@/shared/components/ui/notifications'

type CreateCommentProps = {
  discussionId: string
}

export const CreateComment = ({ discussionId }: CreateCommentProps) => {
  const { addNotification } = useNotifications()
  const createCommentMutation = useCreateComment({
    discussionId,
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Comment Created',
        })
      },
    },
  })

  return (
    <FormDrawer
      isDone={createCommentMutation.isSuccess}
      triggerButton={
        <Button size="sm" icon={<Plus className="size-4" />}>
          Create Comment
        </Button>
      }
      title="Create Comment"
      submitButton={
        <Button
          isLoading={createCommentMutation.isPending}
          form="create-comment"
          type="submit"
          size="sm"
          disabled={createCommentMutation.isPending}
        >
          Submit
        </Button>
      }
    >
      <Form
        id="create-comment"
        onSubmit={(values) => {
          createCommentMutation.mutate({
            data: values,
          })
        }}
        schema={createCommentInputSchema}
        options={{
          defaultValues: {
            body: '',
            discussionId: discussionId,
          },
        }}
      >
        {({ register, formState }) => (
          <Textarea label="Body" error={formState.errors['body']} registration={register('body')} />
        )}
      </Form>
    </FormDrawer>
  )
}
