import { FC, useState } from "react";
import { Button } from "reactstrap";
import { AddGuideModal } from "./AddGuideModal";
import { Guide } from "../../../api/types";

export const AddGuideButton: FC<{
  disabled: boolean;
  onAdd: (guide: Guide) => void;
}> = ({ disabled, onAdd }) => {
  const [dialogOpened, setDialogOpened] = useState(false);

  const toggleDialog = () => {
    setDialogOpened(!dialogOpened);
  };

  return (
    <>
      <Button disabled={disabled} type="button" onClick={toggleDialog}>
        Добавить гида
      </Button>
      <AddGuideModal open={dialogOpened} onAdd={onAdd} onClose={toggleDialog} />
    </>
  );
};
