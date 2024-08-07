import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { css } from '@emotion/react'
import useUser from '@hooks/auth/useUser'
import Button from './Button'
import Flex from './Flex'

import { colors } from '@styles/colorPalette'

function Navbar() {
  const location = useLocation()
  const showSignBtn =
    ['/signup', '/signin'].includes(location.pathname) === false

  const user = useUser()

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  const renderBtn = useCallback(() => {
    if (user != null) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }
    if (showSignBtn) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignBtn, handleLogout])

  return (
    <Flex justify="space-between" align="center" css={NavbarContainerStyles}>
      <Link to="/">홈</Link>
      {renderBtn()}
    </Flex>
  )
}

const NavbarContainerStyles = css`
  position: sticky;
  top: 0;
  padding: 10px 24px;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`

export default Navbar
