import { Suspense } from 'react'
import { HomeQueryParams } from '@/types/params'
import { Heading } from '@/styles/globals'
import { FlexGroup } from './styles'
import Search from '@/components/product/search/Search'
import Sort from '@/components/product/sort/Sort'
import SkeletonLoaders from './skeletons'
import Products from './products'

type Props = {
  searchParams: Promise<HomeQueryParams>
}

const Home = async ({ searchParams }: Props) => {
  return (
    <>
      <Heading>Products</Heading>
      <FlexGroup>
        <Search />
        <Sort />
      </FlexGroup>
      <Suspense fallback={<SkeletonLoaders />}>
        <Products searchParams={await searchParams} />
      </Suspense>
    </>
  )
}

export default Home
