'use client'

import { createClient } from '@/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z } from 'zod'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/form/input'

const FormSchema = z.object({
  email: z.string().nonempty().max(255).email(),
})

type FormValues = z.infer<typeof FormSchema>

const defaultValues: Partial<FormValues> = {
  email: '',
}

const ForgotPasswordForm = () => {
  return (
    <Form
      onSubmit={(values) => {
        console.log(values)
      }}
      options={{
        mode: 'onSubmit',
        defaultValues,
      }}
      schema={FormSchema}
    >
      {({ register, formState }) => (
        <>
          <EmailField />
          <SubmitButton />
        </>
      )}
    </Form>
  )
}

const EmailField = () => {
  const { t } = useTranslation()
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('email')}</FormLabel>
          <FormControl>
            <Input
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              placeholder="name@example.com"
              {...field}
            />
          </FormControl>
          <FormMessage className="font-normal" />
        </FormItem>
      )}
    />
  )
}

const SubmitButton = () => {
  const { t } = useTranslation()
  const { handleSubmit, reset, getValues } = useFormContext()
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const onSubmit = async () => {
    try {
      setIsSubmitting(true)

      const formValues = getValues()

      const supabase = createClient()
      const result = await supabase.auth.resetPasswordForEmail(formValues?.email, {
        // A URL to send the user to after they are confirmed.
        // Don't forget to change the URL in supabase's email template.
        redirectTo: process.env.NEXT_PUBLIC_APP_URL + '/api/auth/confirm?next=/auth/reset-password',
      })
      if (result?.error) throw new Error(result?.error?.message)

      toast.success(t('email_has_been_successfully_sent'))

      reset()
    } catch (e: unknown) {
      toast.error((e as Error)?.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button
      type="submit"
      onClick={handleSubmit(onSubmit)}
      disabled={isSubmitting}
      className="w-full"
    >
      {t('reset_my_password')}
    </Button>
  )
}

export { ForgotPasswordForm }
