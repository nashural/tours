import { FC, useState } from "react";

import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { DadataSuggestion } from "../../../api/types";
import { useApiClient } from "../../../hooks/useApiClient";

export const PickpointInput: FC<{
  id: string;
  name: string;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
}> = ({ id, name, value, error, disabled, onChange, onBlur }) => {
  const apiClient = useApiClient();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<DadataSuggestion[]>([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const suggestions = await apiClient.suggestAddress(query);
      setOptions(suggestions);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AsyncTypeahead
        isLoading={isLoading}
        filterBy={() => true}
        labelKey="value"
        id={id}
        defaultInputValue={value}
        inputProps={{ name }}
        isInvalid={Boolean(error)}
        options={options}
        disabled={disabled}
        onSearch={handleSearch}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
};
