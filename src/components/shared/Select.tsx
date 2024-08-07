import { forwardRef, SelectHTMLAttributes } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Flex from './Flex'
import Text from './Text'

import { Option } from '@models/apply'
import { colors } from '@styles/colorPalette'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  placeholder?: string
}

const BasicSelect = styled.select`
  height: 52px;
  background-color: ${colors.grey};
  border: none;
  border-radius: 10px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: #c0c4c7;
  }
`

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, value, ...props },
  ref,
) {
  return (
    <Flex direction="column" css={selectContainerStyles}>
      {label ? (
        <Text
          typography="t7"
          display="inline-block"
          style={{ marginBottom: 6 }}
        >
          {label}
        </Text>
      ) : null}

      <BasicSelect required={true} ref={ref} value={value} {...props}>
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value} style={{ color: 'black' }}>
            {label}
          </option>
        ))}
      </BasicSelect>
    </Flex>
  )
})

const selectContainerStyles = css`
  padding: 16px 24px 8px;
`

export default Select
