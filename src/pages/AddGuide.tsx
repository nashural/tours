import {
  Breadcrumb,
  BreadcrumbItem,
  FormFeedback,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { FC, useMemo } from "react";
import { Form, Formik, FormikErrors, FormikProps } from "formik";
import { useMutation, useQueryClient } from "react-query";

import { GuideForm } from "../types";
import { Link } from "react-router-dom";
import { LoadingButton } from "../components/LoadingButton";
import { nanoid } from "nanoid";
import { useApiClient } from "../hooks/useApiClient";

export const validate = (values: GuideForm) => {
  const errors: FormikErrors<GuideForm> = {};

  if (values.name.length === 0) {
    errors.name = "Введите имя гида"
  } else
    if (values.description.length === 0) {
      errors.description = 'Введите биографию гида'
    }

  return errors;
};

export const AddGuide: FC<{}> = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient()
  const { isLoading: isSaving, mutate } = useMutation((values: GuideForm) => {
    return apiClient.createGuide(values)
  }, {
    onSuccess() {
      queryClient.invalidateQueries(['guides'])
    }
  })

  const handleSubmit = async (values: GuideForm) => {
    await mutate(values)
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
