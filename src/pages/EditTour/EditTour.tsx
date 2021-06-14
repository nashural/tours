import { Breadcrumb, BreadcrumbItem, FormGroup, Spinner } from "reactstrap";
import { Form, Formik, FormikProps } from "formik";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Bullseye } from "../../components/Bullseye";
import { FC } from "react";
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
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient()
  const { isLoading, data: initialValues } = useQuery(['tours', id], () => apiClient.getTourById(id))
  const { isLoading: isSaving, mutate } = useMutation((values: TourForm) => {
    return apiClient.updateTourById(values.id, values)
  }, {
    onSuccess() {
      queryClient.invalidateQueries('tours')
    }
  })

  const handleSubmit = async (values: TourForm) => {
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
    return (
      <>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/tours">Экскурсии</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{initialValues.name}</BreadcrumbItem>
        </Breadcrumb>
        <Formik
          // @ts-expect-error TS2322
          initialValues={initialValues}
          // @ts-expect-error TS2345
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
