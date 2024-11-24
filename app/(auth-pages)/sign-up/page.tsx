import Link from 'next/link'

import { FormMessage, Message } from '@/shared/components/form-message'
import { SubmitButton } from '@/shared/components/submit-button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { absoluteUrl } from '@/shared/utils'

import { signUpAction } from '../../actions'
import { Policy } from './policy'

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams

  if ('message' in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    )
  }

  return (
    <form className="mx-auto flex w-72 min-w-72 flex-col">
      <h1 className="text-2xl font-medium">회원가입</h1>
      <p className="text text-sm text-foreground">
        이미 계정이 있으신가요?{' '}
        <Link className="font-medium text-primary underline" href={absoluteUrl('/sign-in')}>
          로그인
        </Link>
      </p>
      <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email">이메일</Label>
        <Input name="email" placeholder="you@example.com" required />

        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          name="password"
          placeholder="6글자 이상 입력해 주세요."
          minLength={6}
          required
        />

        <SubmitButton formAction={signUpAction} pendingText="Signing up...">
          가입하기
        </SubmitButton>

        <FormMessage message={searchParams} />

        <Policy />
      </div>
    </form>
  )
}
