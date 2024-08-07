import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '@/remote/apply'
import useUser from '@hooks/auth/useUser'
import Apply from '@components/apply'

import { APPLY_STATUS } from '@/models/apply'

function ApplyPage() {
  const user = useUser()
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()

  const [readyToPoll, setReadyToPoll] = useState(false)

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

  if (readyToPoll || isProgressing) {
    return <div>로딩중...</div>
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
