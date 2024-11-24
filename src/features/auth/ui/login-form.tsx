'use client'

import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import * as z from 'zod'

import { Button } from '@/shared/components/ui/button'
import { Form, Input } from '@/shared/components/ui/form'

// import { loginInputSchema, useLogin } from '@/shared/lib/auth'

type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  // const login = useLogin({
  //   onSuccess,
  // })

  const searchParams = useSearchParams()
  const redirectTo = searchParams?.get('redirectTo')
  return (
    <div>
      <Form
        onSubmit={(values) => {
          // login.mutate(values)
        }}
        schema={z.object({
          email: z.string().email(),
          password: z.string().min(8),
        })}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Input
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <Button
                // isLoading={login.isPending}
                type="submit"
                className="w-full"
              >
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <NextLink
            href={`/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register
          </NextLink>
        </div>
      </div>
    </div>
  )
}
