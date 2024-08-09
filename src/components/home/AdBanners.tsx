import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Skeleton from '@shared/Skeleton'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { getAddBanners } from '@remote/adBanner'

import 'swiper/css'

import { colors } from '@styles/colorPalette'

function AdBanners() {
  const { data, isLoading } = useQuery(['adBanners'], () => getAddBanners())

  if (data == null || isLoading) {
    return (
      <Container>
        <Skeleton width="100%" height="77px" />
      </Container>
    )
  }

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold={true}>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`

export default AdBanners
