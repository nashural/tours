import { FC } from "react";
import {
  ListGroupItem,
  FormGroup,
  Input,
  Label,
  Button,
  FormText,
  FormFeedback
} from "reactstrap";
import { TourPlacementLink } from "../../../types.d";

export const LinkPlacement: FC<TourPlacementLink> = ({
  link,
  type,
  index,
  errors,
  disabled,
  onRemove,
  onChange,
  onBlur
}) => {
  return (
    <ListGroupItem>
      <FormGroup>
        <Label htmlFor={`${type}_${index}`}>Статья по ссылке</Label>
        <Input
          id={`${type}_${index}`}
          name={`placement.placements.${index}.link`}
          value={link}
          invalid={Boolean(errors?.link)}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />
        <FormFeedback>{errors?.link}</FormFeedback>
        <FormText>
          Объявление об экскурсии будет размещено в статье по ссылке
        </FormText>
      </FormGroup>
      <FormGroup>
        <Button color="danger" disabled={disabled} onClick={onRemove}>
          Удалить
        </Button>
      </FormGroup>
    </ListGroupItem>
  );
};
