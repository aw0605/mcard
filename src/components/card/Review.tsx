import { useQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'
import styled from '@emotion/styled'
import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'

function Review() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  const { data = [], isLoading } = useQuery(
    ['review'],
    () => {
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(['너무 좋아요', '꼭 신청하세요 !!'])
        }, 2_000)
      })
    },
    {
      enabled: inView,
    },
  )

  return (
    <Container ref={ref}>
      <Text typography="t4" bold={true} color="blue">
        리뷰
      </Text>
      <Spacing size={12} />
      {isLoading ? (
        <>
          <Skeleton width="100px" height="10px" />
          <Spacing size={6} />
          <Skeleton width="100px" height="10px" />
        </>
      ) : (
        data.map((review) => (
          <div>
            <Text typography="t6">{review}</Text>
            <Spacing size={6} />
          </div>
        ))
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

export default Review
