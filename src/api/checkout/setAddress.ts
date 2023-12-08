import { Address } from '@/types/base/user'
import { fetchData } from '@/utils/api/fetchData'

export const setAddress = async (address: Address) => {
  return fetchData('/checkout/address', { method: 'PUT', body: address })
}
