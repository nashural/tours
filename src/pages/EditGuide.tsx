import {
  Breadcrumb,
  BreadcrumbItem,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import { Form, Formik, FormikProps } from "formik";
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { Bullseye } from "../components/Bullseye";
import { FC } from "react";
import { GuideForm } from "../types";
import { Link } from "react-router-dom";
import { LoadingButton } from "../components/LoadingButton";
import { useApiClient } from "../hooks/useApiClient";
import { useParams } from "react-router-dom";
import { validate } from './AddGuide'

export const EditGuide: FC<{}> = () => {
  const apiClient = useApiClient();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient()
  const { isLoading, data: initialValues } = useQuery(['guides', id], () => {
    return apiClient.getGuideById(id)
  })
  const { isLoading: isSaving, mutate } = useMutation((values: GuideForm) => {
    return apiClient.updateGuideById(values.id, values)
  }, {
    onSuccess() {
      queryClient.invalidateQueries(['guides'])
    }
  })

  const handleSubmit = async (values: GuideForm) => {
    await mutate(values)
  };

  if (isLoading) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }

  if (initialValues) {
    const initialErrors = validate(initialValues)

    return (
      <>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/guides">Гиды</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{initialValues.name}</BreadcrumbItem>
        </Breadcrumb>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          initialErrors={initialErrors}
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
  } else {
    return null
  }
};
