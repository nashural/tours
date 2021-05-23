import { Breadcrumb, BreadcrumbItem, FormGroup, Spinner } from "reactstrap";
import { FC, useEffect, useState } from "react";
import { Form, Formik, FormikProps } from "formik";

import { Bullseye } from "../../components/Bullseye";
import { GuideSection } from "../AddTour/GuideSection";
import { Link } from "react-router-dom";
import { LoadingButton } from "../../components/LoadingButton";
import { MainSection } from "../AddTour/MainSection";
import { PickpointSection } from "../AddTour/PickpointSection";
import { PlacementSection } from "../AddTour/PlacementSection";
import { TourForm } from "../../types";
import { useApiClient } from "../../hooks/useApiClient";
import { useParams } from "react-router-dom";
import { validate } from "../AddTour/validate";

export const EditTour: FC<{}> = () => {
  const apiClient = useApiClient();
  const { id } = useParams<{id: string}>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [initialValues, setInitialValues] = useState<TourForm>();

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .getTourById(id)
      .then((tour) => {
        setInitialValues(tour as TourForm)
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [apiClient, id]);

  const handleSubmit = async (values: TourForm) => {
    try {
      setIsSaving(true);
      const tour = await apiClient.updateTourById(values.id, values);
      setInitialValues(tour as TourForm);
    } finally {
      setIsSaving(false);
    }
  };

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
            <Link to="/tours">Экскурсии</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{initialValues.name}</BreadcrumbItem>
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
            setFieldValue,
            handleChange,
            handleBlur,
            isValid
          }: FormikProps<TourForm>) => {
            return (
              <Form>
                <MainSection
                  values={values}
                  errors={errors}
                  disabled={isSaving}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
                <GuideSection
                  values={values}
                  errors={errors}
                  disabled={isSaving}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
                <PickpointSection
                  values={values}
                  errors={errors}
                  disabled={isSaving}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
                <PlacementSection
                  values={values}
                  errors={errors}
                  disabled={isSaving}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
                <FormGroup>
                  <LoadingButton
                    loading={isSaving}
                    color="success"
                    disabled={!isValid || isSaving}
                  >
                    Сохранить экскурсию
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
