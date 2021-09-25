import ReactTooltip from 'react-tooltip'
import { ReactElement } from 'react'

export interface Props {
  title: string
  children: ReactElement
  key: string
}

export default (props: Props): JSX.Element => {
  const { title, children, key } = props
  return (
    <>
      <div data-tip data-for={key}>
        {children}
        <ReactTooltip id={key} place='top' type='dark' effect={'solid'}>
          {title}
        </ReactTooltip>
      </div>
    </>
  )
}
