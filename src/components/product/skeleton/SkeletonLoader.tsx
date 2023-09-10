import {
  SkeletonContainer,
  SkeletonCard,
  SkeletonBody,
  SkeletonText,
} from './styles'

const SkeletonLoader = () => {
  return (
    <SkeletonContainer>
      <SkeletonCard />
      <SkeletonBody>
        <SkeletonText $long={true} />
        <SkeletonText />
      </SkeletonBody>
    </SkeletonContainer>
  )
}

export default SkeletonLoader
