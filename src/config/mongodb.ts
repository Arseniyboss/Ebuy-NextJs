import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '@/models/product'
import User from '@/models/user'
import Order from '@/models/order'
import products from '@/mocks/products'
import users from '@/mocks/users'
import orders from '@/mocks/orders'

dotenv.config()

const isConnected = mongoose.connection.readyState === 1

const getMongoURI = (env: typeof process.env) => {
  if (env.CYPRESS_TEST === 'true') {
    return process.env.TEST_MONGO_URI
  }
  if (env.NODE_ENV === 'development') {
    return process.env.DEV_MONGO_URI
  }
  if (env.NODE_ENV === 'production') {
    return process.env.MONGO_URI
  }
}

export const connectToDB = async () => {
  if (isConnected || process.env.NODE_ENV === 'test') return
  const uri = getMongoURI(process.env)!
  await mongoose.connect(uri)
}

export const seedProducts = async () => {
  if (process.env.CYPRESS_TEST !== 'true') return
  await Product.insertMany(products)
}

export const deleteProducts = async () => {
  if (process.env.CYPRESS_TEST !== 'true') return
  await Product.deleteMany()
}

export const seedUsers = async () => {
  if (process.env.CYPRESS_TEST !== 'true') return
  await User.insertMany(users)
}

export const deleteUsers = async () => {
  if (process.env.CYPRESS_TEST !== 'true') return
  await User.deleteMany()
}

export const seedOrders = async () => {
  if (process.env.CYPRESS_TEST !== 'true') return
  await Order.insertMany(orders)
}

export const deleteOrders = async () => {
  if (process.env.CYPRESS_TEST !== 'true') return
  await Order.deleteMany()
}
