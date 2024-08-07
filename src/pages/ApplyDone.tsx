import { parse } from 'qs'
import Flex from '@components/shared/Flex'
import Text from '@components/shared/Text'
import FixedBottomBtn from '@components/shared/FixedBottomBtn'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'

function ApplyDone() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string }

  return (
    <Flex justify="center" align="center" css={applyDoneContainerStyles}>
      <Text typography="t5" bold={true} color="blue">
        {success ? '카드 발급을 완료했습니다.' : '카드 발급에 실패했습니다.'}
      </Text>

      <FixedBottomBtn
        label="확인"
        onClick={() => {
          window.history.back()
        }}
      />
    </Flex>
  )
}

const applyDoneContainerStyles = css`
  height: calc(100vh - 121px);
`

export default ApplyDone
