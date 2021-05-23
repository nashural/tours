import { FC } from "react";
import {
  ListGroupItem,
  FormGroup,
  Button,
  Label,
  Input,
  FormText,
  FormFeedback
} from "reactstrap";
import { TourPlacementSearch } from "../../../types.d";

export const SearchPlacement: FC<TourPlacementSearch> = ({
  query,
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
        <Label htmlFor={`${type}_${index}`}>Поисковый запрос</Label>
        <Input
          id={`${type}_${index}`}
          name={`placement.placements.${index}.query`}
          value={query}
          invalid={Boolean(errors?.query)}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />
        <FormFeedback>{errors?.query}</FormFeedback>
        <FormText>
          Экскурсия будет размещена во всех постах, которые найдутся в поиске по
          этому запросу
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
