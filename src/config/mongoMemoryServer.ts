import mongoose from 'mongoose'
import { WithId } from 'types/mongo'
import { Product as ProductType } from 'types/product'
import { User as UserType } from 'types/user'
import { MongoMemoryServer } from 'mongodb-memory-server'
import products from '@mocks/products'
import users from '@mocks/users'

export type Product = WithId<ProductType>
export type User = WithId<UserType>

type Data = Product | User
type Document<T> = Promise<mongoose.mongo.WithId<T>[]>
type Users = Document<UserType>
type Products = Document<ProductType>

const collections = mongoose.connection.collections

let mongoMemoryServer: MongoMemoryServer

export const connectToDB = async () => {
  mongoMemoryServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoMemoryServer.getUri())
}

export const disconnectFromDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
  await mongoose.connection.close()
  await mongoMemoryServer.stop()
}

export const seedCollection = async (name: string, data: Data[]) => {
  const collection = collections[name]
  await collection.insertMany(data)
}

export const seedProducts = async () => {
  await seedCollection('products', products)
}

export const seedUsers = async () => {
  await seedCollection('users', users)
}

const getDocuments = <T>(name: string) => {
  return collections[name].find().toArray() as Document<T>
}

export const getUsers = async (): Promise<Users> => {
  return getDocuments('users')
}

export const getProducts = async (): Promise<Products> => {
  return getDocuments('products')
}
