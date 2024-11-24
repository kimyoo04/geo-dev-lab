'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import * as React from 'react'

import { Button, ButtonProps } from '@/shared/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { languages, type Language } from '@/shared/config/i18next.config'
import { LucideIcon } from '@/shared/lib/lucide-icon'
import { useAppStore } from '@/shared/stores/app-store'
import { cn } from '@/shared/utils/cn'

interface LanguageComboboxProps extends ButtonProps, React.RefAttributes<HTMLButtonElement> {}

const LanguageCombobox = ({
  variant = 'outline',
  role = 'combobox',
  className,
  ...props
}: LanguageComboboxProps) => {
  const router = useRouter()

  const currentLanguage = useAppStore((state) => state.language)
  const setLanguage = useAppStore((state) => state.setLanguage)

  const { t, i18n } = useTranslation()
  const [open, setOpen] = React.useState<boolean>(false)

  const onSelect = (value: string) => {
    if (value === currentLanguage) return false

    i18n.changeLanguage(value)
    setLanguage(value)

    setOpen(false)

    router.refresh()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          role={role}
          className={cn('w-50 justify-between', className)}
          aria-expanded={open}
          {...props}
        >
          <span>
            {currentLanguage
              ? languages?.find((l: Language) => l?.value === currentLanguage)?.native
              : null}
          </span>
          <LucideIcon name="ChevronsUpDown" className="ml-2 size-4 min-w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder={t('search_language')} />
          <CommandList>
            <CommandEmpty>{t('no_language_found')}</CommandEmpty>
            <CommandGroup>
              {languages?.map((language: Language) => (
                <ListItem
                  key={language?.value}
                  language={language}
                  currentValue={currentLanguage}
                  onSelect={onSelect}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const ListItem = ({
  language,
  currentValue,
  onSelect,
}: {
  language: Language
  currentValue: string
  onSelect: (value: string) => void
}) => {
  return (
    <CommandItem value={language?.value} onSelect={onSelect} className="cursor-pointer">
      <LucideIcon
        name="Check"
        className={cn(
          'mr-2 size-4 min-w-4',
          language?.value === currentValue ? 'opacity-100' : 'opacity-0',
        )}
      />
      {language?.native}
    </CommandItem>
  )
}

export { LanguageCombobox, type LanguageComboboxProps }
