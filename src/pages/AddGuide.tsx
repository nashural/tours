import {
  Breadcrumb,
  BreadcrumbItem,
  FormFeedback,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { FC, useMemo, useState } from "react";
import { Form, Formik, FormikErrors, FormikProps } from "formik";

import { GuideForm } from "../types";
import { Link } from "react-router-dom";
import { LoadingButton } from "../components/LoadingButton";
import { nanoid } from "nanoid";
import { useApiClient } from "../hooks/useApiClient";

const validate = (values: GuideForm) => {
  const errors: FormikErrors<GuideForm> = {};

  return errors;
};

export const AddGuide: FC<{}> = () => {
  const apiClient = useApiClient();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSubmit = async (values: GuideForm) => {
    try {
      setIsSaving(true);
      await apiClient.createGuide(values);
    } finally {
      setIsSaving(false);
    }
  };

  const initialValues: GuideForm = useMemo(() => {
    return {
      id: nanoid(),
      name: "",
      description: ""
    };
  }, []);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/guides">Гиды</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Новый гид</BreadcrumbItem>
      </Breadcrumb>
      <Formik
        initialValues={initialValues}
        initialErrors={validate(initialValues)}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          isValid
        }: FormikProps<GuideForm>) => {
          return (
            <Form>
              <FormGroup>
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  invalid={Boolean(errors.name)}
                  disabled={isSaving}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormFeedback>{errors.name}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Описание</Label>
                <Input
                  id="description"
                  type="textarea"
                  rows={7}
                  name="description"
                  invalid={Boolean(errors.description)}
                  disabled={isSaving}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormFeedback>{errors.description}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <LoadingButton
                  type="submit"
                  color="success"
                  loading={isSaving}
                  disabled={!isValid || isSaving}
                >
                  Сохранить гида
                </LoadingButton>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
