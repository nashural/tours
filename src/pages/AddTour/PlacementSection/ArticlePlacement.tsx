import {
  Button,
  FormFeedback,
  FormGroup,
  FormText,
  Label,
  ListGroupItem
} from "reactstrap";
import { FC, useState } from "react";

import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { FindPostsByQueryResult } from "../../../api/types";
import { TourPlacementArticle } from "../../../types.d";
import { first } from "lodash";
import { useApiClient } from "../../../hooks/useApiClient";

export const ArticlePlacement: FC<TourPlacementArticle> = ({
  postId,
  title,
  type,
  index,
  errors,
  disabled,
  setFieldValue,
  onRemove,
  onBlur
}) => {
  const apiClient = useApiClient();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<FindPostsByQueryResult[]>([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      setOptions(await apiClient.findPostsByQuery(query));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ListGroupItem>
      <FormGroup>
        <Label htmlFor={`${type}_${index}`}>Статья</Label>
        <AsyncTypeahead
          isLoading={isLoading}
          filterBy={() => true}
          labelKey="title"
          id={`${type}_${index}`}
          defaultInputValue={title}
          isInvalid={Boolean(errors?.postId)}
          options={options}
          disabled={disabled}
          onSearch={handleSearch}
          onChange={(selected) => {
            if (selected.length === 1) {
              const { postId, title } = first(selected) || {};
              setFieldValue(`placement.placements.${index}.postId`, postId);
              setFieldValue(`placement.placements.${index}.title`, title);
            }
          }}
          onBlur={onBlur}
        />
        <FormFeedback>{errors?.postId}</FormFeedback>
        <FormText>Объявление об экскурсии будет размещено в статье</FormText>
      </FormGroup>
      <FormGroup>
        <Button color="danger" disabled={disabled} onClick={onRemove}>
          Удалить
        </Button>
      </FormGroup>
    </ListGroupItem>
  );
};
