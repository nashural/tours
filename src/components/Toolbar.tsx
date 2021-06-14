import "./Toolbar.css"

import { Children, FC } from 'react'

export const Toolbar: FC<{}> = ({ children }) => {
  return (
    <div className="Toolbar">
      {Children.map(children, (child) => {
        return (
          <div className="Toolbar__item">{child}</div>
        )
      })}
    </div>
  )
}
