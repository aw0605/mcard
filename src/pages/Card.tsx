import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { css } from '@emotion/react'
import useUser from '@hooks/auth/useUser'
import { getCard } from '@remote/card'
import { useAlertContext } from '@contexts/AlertContext'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Top from '@shared/Top'
import ListRow from '@shared/ListRow'
import FixedBottomBtn from '@shared/FixedBottomBtn'

function CardPage() {
  const { id = '' } = useParams()

  const user = useUser()
  const { open } = useAlertContext()

  const navigate = useNavigate()

  const moveToApply = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요합니다.',
        onBtnClick: () => {
          navigate('/signin')
        },
      })

      return
    }

    navigate(`/apply/${id}`)
  }, [user, id, open, navigate])

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  })

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, idx) => {
          return (
            <motion.li
              initial={{ opacity: 0, translateX: -90 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 0.1],
                delay: idx * 0.1,
              }}
              animate={{ opacity: 1, translateX: 0 }}
              key={idx}
            >
              <ListRow
                as="div"
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${idx + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomBtn label="신청하기" onClick={moveToApply} />
    </div>
  )
}

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

function IconCheck() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fillOpacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  )
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`

export default CardPage
