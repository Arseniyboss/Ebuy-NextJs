import { Address } from '@/types/base/user'
import { withAuth } from '@/utils/api/withAuth'
import { getTokenCookie } from '@/utils/api/getTokenCookie'
import { setCookie } from '@/utils/api/setCookie'

export const PUT = withAuth(async ({ request, user }) => {
  const address: Address = await request.json()
  user.address = address
  await user.save()
  const tokenCookie = await getTokenCookie(user)
  return setCookie(tokenCookie, 201)
})
