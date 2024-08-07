import { useQuery, UseQueryOptions } from 'react-query'
import { getAppliedCard } from '@remote/apply'

import { ApplyValues } from '@models/apply'

function useAppliedCard({
  userId,
  cardId,
  options,
}: {
  cardId: string
  userId: string
  options?: Pick<
    UseQueryOptions<ApplyValues | null>,
    'onError' | 'onSuccess' | 'suspense'
  >
}) {
  return useQuery(
    ['applied', userId, cardId],
    () => getAppliedCard({ userId, cardId }),
    options,
  )
}

export default useAppliedCard
