import { Review as Props } from '@/types/api'
import { formatReviewDate } from '@/utils/formatters/formatReviewDate'
import { ReviewContainer, Comment } from './styles'
import Rating from '@/components/product/rating/Rating'

const Review = ({ username, comment, rating, createdAt }: Props) => {
  return (
    <ReviewContainer>
      <p data-testid='review-username'>{username}</p>
      <Rating value={rating} />
      <p data-testid='review-date'>{formatReviewDate(createdAt)}</p>
      {comment && <Comment data-testid='review-comment'>{comment}</Comment>}
    </ReviewContainer>
  )
}

export default Review
