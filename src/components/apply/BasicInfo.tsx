import { ChangeEvent, useCallback, useState } from 'react'
import Select from '@shared/Select'

import {
  salaryOption,
  creditScoreOption,
  paymentDateOption,
} from '@/constants/apply'
import { ApplyValues } from '@/models/apply'
import FixedBottomBtn from '../shared/FixedBottomBtn'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

function BasicInfo({ onNext }: { onNext: (infoValues: InfoValues) => void }) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const isAll = Object.values(infoValues).every((v) => v)

  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={salaryOption}
        placeholder={salaryOption[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={creditScoreOption}
        placeholder={creditScoreOption[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={paymentDateOption}
        placeholder={paymentDateOption[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />

      <FixedBottomBtn
        label="다음"
        onClick={() => {
          onNext(infoValues)
        }}
        disabled={!isAll}
      />
    </div>
  )
}

export default BasicInfo
