import { Switch } from 'theme-ui'

export interface Props {
  label?: string
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => boolean
}

export default (props: Props): JSX.Element => {
  const { label, disabled, onChange, checked } = props
  return <Switch label={label} onChange={() => onChange(!checked)} checked={checked} disabled={disabled} />
}
