import {
  Card,
  CardText,
  CardTitle,
  FormFeedback,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { FC, useEffect, useMemo, useState } from "react";

import { AddGuideButton } from "./AddGuideButton";
import { FormikErrors } from "formik";
import { Guide } from "../../api/types";
import { TourForm } from "../../types";
import { useApiClient } from "../../hooks/useApiClient";

export const GuideSection: FC<{
  values: TourForm;
  errors: FormikErrors<TourForm>;
  disabled: boolean;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  setFieldValue: (name: string, value: any) => void;
}> = ({
  values,
  errors,
  disabled,
  handleChange,
  handleBlur,
  setFieldValue
}) => {
  const apiClient = useApiClient();
  const [guides, setGuides] = useState<Guide[]>([]);

  useEffect(() => {
    apiClient.getGuides().then(setGuides);
  }, [apiClient]);

  const noGuide = useMemo(() => {
    if (guides.length > 0) return null;

    return (
      <Card body>
        <CardTitle tag="h5">Добавьте гида</CardTitle>
        <CardText>
          У вас не заведены гиды, которые могли бы провести экскурсию.
          Пожалуйста, добавьте гида
        </CardText>
        <AddGuideButton
          disabled={disabled}
          onAdd={(guide) => {
            setGuides([...guides, guide]);
            setFieldValue("guide", guide.id);
          }}
        >
          Добавить гида
        </AddGuideButton>
      </Card>
    );
  }, [guides, disabled, setFieldValue]);

  const guidesSelector = useMemo(() => {
    if (guides.length === 0) return null;

    return (
      <>
        <FormGroup>
          <Label htmlFor="guide">Гид</Label>
          <Input
            id="guide"
            type="select"
            name="guide"
            invalid={Boolean(errors.guide)}
            value={values.guide}
            disabled={disabled}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">-- Не выбрано --</option>
            {guides.map((guide) => {
              return (
                <option key={guide.id} value={guide.id}>
                  {guide.name}
                </option>
              );
            })}
          </Input>
          <FormFeedback>{errors.guide}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <AddGuideButton
            disabled={disabled}
            onAdd={(guide) => {
              setGuides([...guides, guide]);
              setFieldValue("guide", guide.id);
            }}
          >
            Добавить гида
          </AddGuideButton>
        </FormGroup>
      </>
    );
  }, [
    values.guide,
    errors.guide,
    guides,
    handleBlur,
    handleChange,
    setFieldValue,
    disabled
  ]);

  return (
    <div>
      <h2>Гид</h2>
      {guides.length === 0 ? noGuide : guidesSelector}
      <FormGroup>
        <Label>Контактный номер телефона</Label>
        <Input
          id="phone"
          type="text"
          name="phone"
          invalid={Boolean(errors.phone)}
          value={values.phone}
          disabled={disabled}
          placeholder="+7 999 999-99-99"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormGroup>
    </div>
  );
};
