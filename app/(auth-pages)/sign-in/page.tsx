import Link from 'next/link'

import { FormMessage, Message } from '@/shared/components/form-message'
import { SignInWith } from '@/shared/components/signin-with'
import { SubmitButton } from '@/shared/components/submit-button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { absoluteUrl } from '@/shared/utils'

import { signInAction } from '../../actions'

export default async function Signin(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams
  return (
    <form className="flex w-72 min-w-72 flex-col">
      <h1 className="text-2xl font-medium">로그인</h1>
      <p className="text-sm text-foreground">
        계정이 없으신가요?{' '}
        <Link className="font-medium text-foreground underline" href={absoluteUrl('/sign-up')}>
          회원가입
        </Link>
      </p>
      <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email">이메일</Label>
        <Input name="email" placeholder="you@example.com" required />

        <div className="flex items-center justify-between">
          <Label htmlFor="password">비밀번호</Label>
          <Link className="text-xs text-foreground underline" href="/forgot-password">
            비밀번호를 잊으셨나요?
          </Link>
        </div>
        <Input type="password" name="password" placeholder="6글자 이상 입력해 주세요." required />

        <SubmitButton pendingText="로그인 중..." formAction={signInAction}>
          로그인
        </SubmitButton>

        <FormMessage message={searchParams} />
      </div>
      <SignInWith />
    </form>
  )
}
