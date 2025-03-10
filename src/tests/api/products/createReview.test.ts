import { NextRequest } from 'next/server'
import { CreateReviewParams as Review } from '@/types/params'
import { BASE_URL } from '@/baseUrl'
import { POST } from '@/app/api/products/[id]/review/route'
import { seedProducts, seedUsers, getProducts } from '@/database/mongoMemoryServer'
import { generatePayload } from '@/auth/generators/generatePayload'
import { generateAccessToken } from '@/auth/generators/generateAccessToken'
import { fakeProductId, fakePayload } from '@/mocks/fakeData'
import products from '@/mocks/products'
import users from '@/mocks/users'

const user = users[2]

const defaultPayload = generatePayload(user)

const review: Review = {
  rating: 5,
  comment: 'Excellent Product!',
}

const createReview = async (productId: string, payload = defaultPayload) => {
  const url = `${BASE_URL}/api/products/${productId}/review`
  const accessToken = await generateAccessToken(payload)
  const request = new NextRequest(url, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const params = Promise.resolve({ id: productId })
  const { status, statusText } = await POST(request, { params })
  return { status, statusText }
}

beforeAll(async () => {
  await seedProducts()
  await seedUsers()
})

describe('POST /api/products/:id/review', () => {
  describe('given the product does not exist', () => {
    it('returns status code 404', async () => {
      const { status, statusText } = await createReview(fakeProductId)

      expect(status).toBe(404)
      expect(statusText).toBe('Product not found')
    })
  })

  describe('given the product exists', () => {
    describe('given the user does not exist', () => {
      it('returns status code 404', async () => {
        const productId = products[0]._id.toString()

        const { status, statusText } = await createReview(productId, fakePayload)

        expect(status).toBe(404)
        expect(statusText).toBe('User not found')
      })
    })

    describe('given the user exists', () => {
      describe('given the product has already been reviewed', () => {
        it('returns status code 400', async () => {
          const productId = products[0]._id.toString()
          const { status, statusText } = await createReview(productId)

          expect(status).toBe(400)
          expect(statusText).toBe('Product already reviewed')
        })
      })

      describe('given the product has not yet been reviewed', () => {
        it('returns status code 201 and creates a review', async () => {
          const productId = products[1]._id.toString()

          const { status } = await createReview(productId)
          const newProducts = await getProducts()

          const product = newProducts[1]
          const review = product.reviews[1]
          const { userId, username, rating, comment } = review

          expect(status).toBe(201)
          expect(userId.toString()).toBe(user._id.toString())
          expect(username).toBe(user.name)
          expect(rating).toBe(review.rating)
          expect(comment).toBe(review.comment)
          expect(product.rating).toBe(4.5)
        })
      })
    })
  })
})
