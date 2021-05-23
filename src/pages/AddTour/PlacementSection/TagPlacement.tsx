import {
  Button,
  FormFeedback,
  FormGroup,
  Label,
  ListGroupItem
} from "reactstrap";
import { FC, useState } from "react";

import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { FindTagsByQueryResult } from "../../../api/types";
import { TourPlacementTag } from "../../../types.d";
import { first } from "lodash";
import { useApiClient } from "../../../hooks/useApiClient";

export const TagPlacement: FC<TourPlacementTag> = ({
  name,
  type,
  index,
  setFieldValue,
  errors,
  disabled,
  onChange,
  onRemove,
  onBlur
}) => {
  const apiClient = useApiClient();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<FindTagsByQueryResult[]>([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      setOptions(await apiClient.findTagsByQuery(query));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ListGroupItem>
      <FormGroup>
        <Label htmlFor={`${type}_${index}`}>Тег</Label>
        <AsyncTypeahead
          isLoading={isLoading}
          filterBy={() => true}
          labelKey="name"
          id={`${type}_${index}`}
          defaultInputValue={name}
          options={options}
          isInvalid={Boolean(errors?.tagId)}
          disabled={disabled}
          onSearch={handleSearch}
          onChange={(selected) => {
            if (selected.length === 1) {
              const { tagId, name } = first(selected) || {};
              setFieldValue(`placement.placements.${index}.tagId`, tagId);
              setFieldValue(`placement.placements.${index}.name`, name);
            }
          }}
          onBlur={onBlur}
        />
        <FormFeedback>{errors?.tagId}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Button color="danger" disabled={disabled} onClick={onRemove}>
          Удалить
        </Button>
      </FormGroup>
    </ListGroupItem>
  );
};
