import { useMutation } from 'react-query'
import { applyCard } from '@remote/apply'
import { useAlertContext } from '@contexts/AlertContext'

import { ApplyValues } from '@models/apply'

interface useApplyCardMutationProps {
  onSuccess: () => void
  onError: () => void
}

function useApplyCardMutation({
  onSuccess,
  onError,
}: useApplyCardMutationProps) {
  const { open } = useAlertContext()

  return useMutation((applyValues: ApplyValues) => applyCard(applyValues), {
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      open({
        title: '카드 신청에 실패했습니다. 잠시후 다시 시도해주세요',
        onBtnClick: () => {
          onError()
        },
      })
    },
  })
}

export default useApplyCardMutation
