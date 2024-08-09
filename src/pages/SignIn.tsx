import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { useAlertContext } from '@contexts/AlertContext'
import Form from '@components/signin/Form'

import { FormValues } from '@models/signin'

function SingInPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues

      try {
        await signInWithEmailAndPassword(auth, email, password)

        navigate('/')
      } catch (e) {
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/wrong-password') {
            open({
              title: '로그인 정보를 다시 확인해주세요',
              onBtnClick: () => {
                //
              },
            })

            return
          }
        }

        open({
          title: '잠시 후 다시 시도해주세요.',
          onBtnClick: () => {
            //
          },
        })
      }
    },
    [open, navigate],
  )

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SingInPage
