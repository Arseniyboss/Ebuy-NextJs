import { NextRequest, NextResponse } from 'next/server'
import { PageParams } from '@/types/params'
import { connectToDB } from '@/config/mongodb'
import { getUser } from '@/utils/api/getUser'
import { throwError } from '@/utils/api/throwError'
import { setCookie } from '@/utils/api/setCookie'
import { generatePayload } from '@/auth/token/generators/generatePayload'
import { generateTokenCookie } from '@/auth/token/generators/generateTokenCookie'

export const DELETE = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const user = await getUser(request)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  const cartItem = user.cartItems.find(({ id }) => params.id === id)

  if (!cartItem) {
    return throwError({ error: 'Cart item not found', status: 404 })
  }

  await cartItem.deleteOne()

  await user.save()

  const payload = generatePayload(user)
  const tokenCookie = await generateTokenCookie(payload)

  return setCookie(tokenCookie)
}

export const PATCH = async (request: NextRequest, { params }: PageParams) => {
  await connectToDB()

  const quantity: number = await request.json()
  const user = await getUser(request)

  if (!user) {
    return throwError({ error: 'User not found', status: 404 })
  }

  const cartItem = user.cartItems.find(({ id }) => params.id === id)

  if (!cartItem) {
    return throwError({ error: 'Cart item not found', status: 404 })
  }

  cartItem.quantity = quantity

  await user.save()

  return NextResponse.json(null, { status: 200 })
}
