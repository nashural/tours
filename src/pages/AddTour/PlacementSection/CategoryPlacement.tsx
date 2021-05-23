import {
  Button,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  ListGroupItem
} from "reactstrap";
import { FC, useState } from "react";

import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { FindCategoriesByQueryResult } from "../../../api/types";
import { TourPlacementCategory } from "../../../types.d";
import { first } from "lodash";
import { useApiClient } from "../../../hooks/useApiClient";

export const CategoryPlacement: FC<TourPlacementCategory> = ({
  categoryId,
  name,
  includeChildren,
  type,
  index,
  errors,
  disabled,
  setFieldValue,
  onChange,
  onRemove,
  onBlur
}) => {
  const apiClient = useApiClient();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<FindCategoriesByQueryResult[]>([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      setOptions(await apiClient.findCategoriesByQuery(query));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ListGroupItem>
      <FormGroup>
        <Label htmlFor={`${type}_${index}`}>Категория</Label>
        <AsyncTypeahead
          isLoading={isLoading}
          filterBy={() => true}
          labelKey="name"
          id={`${type}_${index}`}
          defaultInputValue={name}
          options={options}
          isInvalid={Boolean(errors?.categoryId)}
          disabled={disabled}
          onSearch={handleSearch}
          onChange={(selected) => {
            if (selected.length === 1) {
              const { categoryId, name } = first(selected) || {};
              setFieldValue(
                `placement.placements.${index}.categoryId`,
                categoryId
              );
              setFieldValue(`placement.placements.${index}.name`, name);
            }
          }}
          onBlur={onBlur}
        />
        <FormFeedback>{errors?.categoryId}</FormFeedback>
        <FormText>
          Объявление об экскурсии будет размещено в указанной категории
          {includeChildren ? ", включая подкатегории" : ""}
        </FormText>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name={`placement.placements.${index}.includeChildren`}
            checked={includeChildren}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
          />
          Включая подкатегории
        </Label>
      </FormGroup>
      <FormGroup>
        <Button color="danger" disabled={disabled} onClick={onRemove}>
          Удалить
        </Button>
      </FormGroup>
    </ListGroupItem>
  );
};
