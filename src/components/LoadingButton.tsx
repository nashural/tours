import { FC } from "react";
import { Button, ButtonProps, Spinner } from "reactstrap";

export const LoadingButton: FC<
  {
    loading: boolean;
  } & ButtonProps
> = ({ loading, children, ...rest }) => {
  return (
    <Button {...rest}>
      {!loading && children}
      {loading && <Spinner size="sm" />}
    </Button>
  );
};
