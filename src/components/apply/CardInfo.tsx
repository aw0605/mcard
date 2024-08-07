import { useCallback, useState, MouseEvent } from 'react'
import Button from '@shared/Button'
import FixedBottomBtn from '@shared/FixedBottomBtn'

import { ApplyValues } from '@/models/apply'

type cardInfoValues = Pick<ApplyValues, 'isMaster' | 'isRf' | 'isHipass'>

function CardInfo({
  onNext,
}: {
  onNext: (cardInfoValues: cardInfoValues) => void
}) {
  const [infoValues, setInfoValues] = useState<cardInfoValues>({
    isMaster: false,
    isRf: false,
    isHipass: false,
  })

  const { isMaster, isRf, isHipass } = infoValues

  const handleBtnClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement

    setInfoValues((prev) => ({
      ...prev,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }, [])

  return (
    <div>
      <Button.Group title="해외결제">
        <Button
          name="isMaster"
          weak={!isMaster}
          size="medium"
          data-value={true}
          onClick={handleBtnClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={isMaster}
          size="medium"
          data-value={false}
          onClick={handleBtnClick}
        >
          국내전용
        </Button>
      </Button.Group>

      <Button.Group title="후불교통기능">
        <Button
          name="isRf"
          weak={isRf}
          size="medium"
          data-value={false}
          onClick={handleBtnClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={!isRf}
          size="medium"
          data-value={true}
          onClick={handleBtnClick}
        >
          신청
        </Button>
      </Button.Group>

      <Button.Group title="후불하이패스">
        <Button
          name="isHipass"
          weak={isHipass}
          size="medium"
          data-value={false}
          onClick={handleBtnClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={!isHipass}
          size="medium"
          data-value={true}
          onClick={handleBtnClick}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomBtn
        label="다음"
        onClick={() => {
          onNext(infoValues)
        }}
      />
    </div>
  )
}

export default CardInfo
