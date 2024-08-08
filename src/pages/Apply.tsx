import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlertContext } from '@contexts/AlertContext'
import useUser from '@hooks/auth/useUser'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import useAppliedCard from '@components/apply/hooks/useAppliedCard'
import { updateApplyCard } from '@remote/apply'
import Apply from '@components/apply'
import FullPageLoader from '@shared/FullPageLoader'

import { APPLY_STATUS } from '@models/apply'

function ApplyPage() {
  const user = useUser()
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()
  const { open } = useAlertContext()

  const [readyToPoll, setReadyToPoll] = useState(false)

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onBtnClick: () => {
              window.history.back()
            },
          })
          return
        }

        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', {
        replace: true,
      })
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading: isProgressing } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  if (readyToPoll || isProgressing) {
    return <FullPageLoader message="카드를 발급중입니다." />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
