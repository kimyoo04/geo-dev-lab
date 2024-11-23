'use client'

import { Pen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form'
import { useNotifications } from '@/components/ui/notifications'

import { updateProfileInputSchema, useUpdateProfile } from '@/features/users/api/update-profile'

export const UpdateProfile = () => {
  const { addNotification } = useNotifications()
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Profile Updated',
        })
      },
    },
  })

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button icon={<Pen className="size-4" />} size="sm">
          Update Profile
        </Button>
      }
      title="Update Profile"
      submitButton={
        <Button
          form="update-profile"
          type="submit"
          size="sm"
          isLoading={updateProfileMutation.isPending}
        >
          Submit
        </Button>
      }
    >
      <Form
        id="update-profile"
        onSubmit={(values) => {
          updateProfileMutation.mutate({ data: values })
        }}
        options={{
          defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            bio: '',
          },
        }}
        schema={updateProfileInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <Input
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <Input
              label="Email Address"
              type="email"
              error={formState.errors['email']}
              registration={register('email')}
            />

            <Textarea label="Bio" error={formState.errors['bio']} registration={register('bio')} />
          </>
        )}
      </Form>
    </FormDrawer>
  )
}
