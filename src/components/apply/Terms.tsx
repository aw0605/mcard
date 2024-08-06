import { useCallback, useState, MouseEvent } from 'react'
import Agreement from '@shared/Agreement'
import { agreeList } from '@/constants/apply'
import FixedBottomBtn from '../shared/FixedBottomBtn'

import { ApplyValues } from '@/models/apply'

function Terms({ onNext }: { onNext: (terms: ApplyValues['terms']) => void }) {
  const [termsAgree, setTermsAgree] = useState(() => {
    return agreeList.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const handleAllAgree = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgree((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  const isAll = Object.values(termsAgree).every((agree) => agree)

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={isAll} onChange={handleAllAgree}>
          약관에 모두 동의
        </Agreement.Title>

        {agreeList.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgree[id]}
            onChange={(_, checked) => {
              setTermsAgree((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>

      <FixedBottomBtn
        label="약관동의"
        disabled={!isAll}
        onClick={() => {
          onNext(Object.keys(termsAgree))
        }}
      />
    </div>
  )
}

export default Terms
