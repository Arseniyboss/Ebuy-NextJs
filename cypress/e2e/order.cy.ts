import { getDeliveryDate } from './../../src/utils/getDeliveryDate'
import { getCurrentDate } from '../../src/utils/getCurrentDate'

const id = '62dbfa7f31c12b460f19f2c1'

before(() => {
  cy.task('seedUsers')
  cy.task('seedOrders')
})

after(() => {
  cy.task('deleteUsers')
  cy.task('deleteOrders')
})

describe('Order Page', () => {
  describe('given the user is not an admin', () => {
    beforeEach(() => {
      cy.login({ email: 'robert@gmail.com', password: '123456' })
    })

    it('gets user order', () => {
      cy.visit(`/order/${id}`)

      cy.getOrder(id).then((response) => {
        const { status, body } = response
        const { address, paymentMethod, orderItems } = body

        expect(status).to.equal(200)

        cy.assertAddress(address)
        cy.assertPaymentMethod(paymentMethod)
        cy.assertOrderItems(orderItems)
        cy.assertTotalPrice(orderItems)
      })
    })

    describe('gets order delivery address and status messages', () => {
      it('given the order is not paid', () => {
        cy.visit(`/order/${id}`)

        const deliveryDate = getDeliveryDate()

        cy.assertDeliveryDate(deliveryDate)

        cy.getMessage('error-message', 'Not Paid')
        cy.getMessage('error-message', 'Not Delivered', 1)
      })

      it('given the order is paid but not delivered', () => {
        const id = '62dbfa7f31c12b460f19f2c2'
        cy.visit(`/order/${id}`)

        cy.getOrder(id).then((response) => {
          const { paidAt, deliveryDate } = response.body

          cy.assertDeliveryDate(deliveryDate)

          cy.getMessage('success-message', `Paid on ${paidAt}`)
          cy.getMessage('error-message', 'Not Delivered')
        })
      })

      it('given the order is paid and delivered', () => {
        const id = '62dbfa7f31c12b460f19f2c3'
        cy.visit(`/order/${id}`)

        cy.getOrder(id).then((response) => {
          const { paidAt, deliveredAt } = response.body
          cy.getMessage('success-message', `Paid on ${paidAt}`)
          cy.getMessage('success-message', `Delivered on ${deliveredAt}`, 1)
        })
      })
    })
  })

  describe('given the user is an admin', () => {
    it('updates order to delivered', () => {
      const id = '62dbfa7f31c12b460f19f2c2'
      cy.intercept('PUT', `/api/orders/${id}/updateToDelivered`).as(
        'updateOrderToDelivered'
      )
      cy.login({ email: 'admin@gmail.com', password: '123456' })
      cy.visit(`/order/${id}`)

      cy.getByTestId('admin-button').click()

      cy.wait('@updateOrderToDelivered').then(({ response }) => {
        expect(response.statusCode).to.equal(200)

        const currentDate = getCurrentDate()
        cy.getMessage('success-message', `Delivered on ${currentDate}`, 1)
      })
    })
  })
})
