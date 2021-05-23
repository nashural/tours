import { FC } from "react";

import "./LoginLayout.css";

export const LoginLayout: FC<{}> = ({ children }) => {
  return <div className="LoginLayout">{children}</div>;
};
