import Link from 'next/link'

import { FormMessage, Message } from '@/shared/components/form-message'
import { SubmitButton } from '@/shared/components/submit-button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

import { forgotPasswordAction } from '../../actions'

export default async function ForgotPassword(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams
  return (
    <form className="flex w-72 min-w-72 flex-col">
      <div>
        <h1 className="text-2xl font-medium">Reset Password</h1>
        <p className="text-sm text-secondary-foreground">
          Already have an account?{' '}
          <Link className="text-primary underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <SubmitButton formAction={forgotPasswordAction}>Reset Password</SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  )
}
