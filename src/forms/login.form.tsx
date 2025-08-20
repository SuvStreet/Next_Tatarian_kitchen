'use client'

import { signInWithCredentials } from '@/actions/sing-in'
import { Button, Form, Input } from '@heroui/react'
import { useSession } from 'next-auth/react'
import { useState, useTransition } from 'react'

type IProps = {
  onClose: () => void
}

const LoginForm = ({ onClose }: IProps) => {
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    startTransition(async () => {
      e.preventDefault()

      await signInWithCredentials(formData.email, formData.password)

      await update()

      onClose()
    })
  }

  return (
    <Form className="w-full" onSubmit={handleSubmit}>
      <Input
        aria-label="Email"
        isRequired
        name="email"
        placeholder="Введите email"
        type="email"
        value={formData.email}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none ',
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return 'Почта обязательна'
          return null
        }}
      />

      <Input
        isRequired
        name="password"
        placeholder="Введите пароль"
        type="password"
        value={formData.password}
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none ',
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return 'Пароль обязателен'
          if (value.length < 6) return 'Пароль должен быть не менее 6 символов'
          return null
        }}
      />

      <div className="flex w-[100%]  gap-4 items-center pt-8 justify-end">
        <Button variant="light" onPress={onClose} disabled={isPending}>
          Отмена
        </Button>
        <Button color="primary" type="submit" disabled={isPending} isLoading={isPending}>
          Войти
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
