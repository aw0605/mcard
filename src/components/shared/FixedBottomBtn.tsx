import { createPortal } from 'react-dom'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Button from './Button'

import { colors } from '@/styles/colorPalette'

interface FixedBottomBtnProps {
  label: string
  onClick: () => void
}

function FixedBottomBtn({ label, onClick }: FixedBottomBtnProps) {
  const $portalRoot = document.getElementById('root-portal')

  if ($portalRoot == null) {
    return null
  }

  return createPortal(
    <Container>
      <Button onClick={onClick} full={true} size="medium" css={BtnStyles}>
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
`

const BtnStyles = css`
  border-radius: 8px;
`

export default FixedBottomBtn
