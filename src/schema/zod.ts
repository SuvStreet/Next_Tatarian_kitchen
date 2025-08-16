import { email, number, object, string } from 'zod'
import { z } from 'zod'

export const signInSchema = object({
  email: email({
    error: (issue) =>
      issue.input === undefined ? 'Требуется Email' : 'Неверный email',
  }),
  password: string({
    error: (issue) =>
      issue.input === undefined ? 'Требуется пароль' : 'Неверный пароль',
  })
    .min(1, 'Требуется пароль')
    .min(6, 'Пароль должен быть более 6 символов')
    .max(32, 'Пароль должен быть менее 32 символов'),
})

export const ingredientSchema = object({
  name: string().min(1, 'Название обязательно'),
  category: z.enum([
    'VEGETABLES',
    'FRUITS',
    'MEAT',
    'DAIRY',
    'SPICES',
    'OTHER',
  ]),
  unit: z.enum(['GRAMS', 'KILOGRAMS', 'LITERS', 'MILLILITERS', 'PIECES']),
  pricePerUnit: number({
    error: (issue) =>
      issue.code === undefined
        ? 'Цена должна быть числом'
        : 'Ошибка в поле цены',
  })
    .min(0, 'Цена должна быть положительной')
    .nullable(),
  description: z.string().optional(),
})
