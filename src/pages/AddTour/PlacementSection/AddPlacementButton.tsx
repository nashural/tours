import { FC, useState } from "react";
import { PlacementDescriptor } from "../../../types.d";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { map } from "lodash";

export const AddPlacementButton: FC<{
  descriptors: PlacementDescriptor[];
  disabled: boolean;
  onCreate: (value: any) => void;
}> = ({ descriptors, disabled, onCreate }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <ButtonDropdown disabled={disabled} isOpen={open} toggle={handleToggle}>
      <DropdownToggle caret>Добавить</DropdownToggle>
      <DropdownMenu>
        {map(descriptors, ({ addButtonText, create }) => {
          return (
            <DropdownItem
              onClick={() => {
                onCreate(create());
              }}
            >
              {addButtonText}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </ButtonDropdown>
  );
};
