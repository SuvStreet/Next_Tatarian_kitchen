'use server'

import { IFormData } from '@/types/form-data'
import { saltAndHashPassword } from '@/utils/password'
import prisma from '@/utils/prisma'
import { signIn } from '@/auth/auth'

export async function registerUser(formData: IFormData) {
  const { email, password, confirmPassword } = formData

  if (password !== confirmPassword) {
    return { error: 'Пароли не совпадают' }
  }

  if (password.length < 6) {
    return { error: 'Пароль должен быть не менее 6 символов' }
  }

  try {
    const userExists = await prisma.user.findUnique({ where: { email } })

    if (userExists) {
      return { error: 'Пользователь с таким email уже существует' }
    }

    const pwHash = await saltAndHashPassword(password)

    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwHash,
      },
    })

    await signIn('credentials', { email, password, redirect: false })

    return {
      user: {
        email: user.email,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    }
  } catch (error) {
    console.error('Ошибка регистрации:', error)
    return { error: 'Ошибка при регистрации' }
  }
}
