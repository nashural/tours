import "./Well.css"

import { FC } from 'react'

export const Well: FC<{}> = ({ children }) => {
  return (
    <div className="Well">
      {children}
    </div>
  )
}
