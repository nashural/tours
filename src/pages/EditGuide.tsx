import {
  Breadcrumb,
  BreadcrumbItem,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import { FC, useEffect, useState } from "react";
import { Form, Formik, FormikErrors, FormikProps } from "formik";

import { Bullseye } from "../components/Bullseye";
import { GuideForm } from "../types";
import { Link } from "react-router-dom";
import { LoadingButton } from "../components/LoadingButton";
import { useApiClient } from "../hooks/useApiClient";
import { useParams } from "react-router-dom";

const validate = (values: GuideForm) => {
  const errors: FormikErrors<GuideForm> = {};

  return errors;
};

export const EditGuide: FC<{}> = () => {
  const apiClient = useApiClient();
  const { id } = useParams<{id: string}>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<GuideForm>();

  const handleSubmit = async (values: GuideForm) => {
    try {
      setIsSaving(true);
      const guide = await apiClient.updateGuideById(values.id, values);
      setInitialValues(guide);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    apiClient
      .getGuideById(id)
      .then(setInitialValues)
      .then(() => {
        setIsLoading(false);
      });
  }, [apiClient, id]);

  if (isLoading) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }

  if (initialValues) {
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
          initialErrors={validate(initialValues)}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            setFieldValue,
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
