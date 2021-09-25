import { Checkbox, Label } from 'theme-ui'
import { ReactElement } from 'react'

export interface Props {
  label?: string | ReactElement
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => boolean
}

export default (props: Props): JSX.Element => {
  const { label, checked, disabled, onChange } = props
  return (
    <Label>
      <Checkbox onChange={() => onChange(!checked)} disabled={disabled} checked={checked} />
      {label}
    </Label>
  )
}
