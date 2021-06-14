import { Breadcrumb, BreadcrumbItem, FormGroup } from "reactstrap";
import { FC, useMemo } from "react";
import { Form, Formik, FormikProps } from "formik";
import { Link, useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import { GuideSection } from "./GuideSection";
import { LoadingButton } from "../../components/LoadingButton";
import { MainSection } from "./MainSection";
import { PickpointSection } from "./PickpointSection";
import { PlacementSection } from "./PlacementSection";
import { TourForm } from "../../types";
import { nanoid } from "nanoid";
import { useApiClient } from "../../hooks/useApiClient";
import { validate } from "./validate";

export const AddTour: FC<{}> = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient()
  const history = useHistory()
  const { isLoading: isSaving, mutate } = useMutation((values: TourForm) => {
    return apiClient.createTour(values)
  }, {
    onMutate(variables) {
      queryClient.setQueryData(['tours', variables.id], variables)
    },
    onSuccess() {
      queryClient.invalidateQueries('tours')
    }
  })

  const handleSubmit = async (values: TourForm) => {
    await mutate(values)
    history.push(`/tours/${values.id}`)
  };

  const initialValues: TourForm = useMemo(() => {
    return {
      id: nanoid(),
      name: "",
      date: "",
      price: "",
      description: "",
      count: "",
      details: "",
      shedule: "",
      guide: "",
      phone: "",
      pickpoint: {
        address: "",
        comment: "",
        coordinates: [0, 0],
        time: ""
      },
      placement: {
        id: nanoid(),
        placements: []
      }
    };
  }, []);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/tours">Экскурсии</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Новая экскурсия</BreadcrumbItem>
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
};
