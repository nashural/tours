import { ArrayHelpers, FieldArray, FormikErrors } from "formik";
import { FormGroup, ListGroup } from "reactstrap";
import { map, omit } from "lodash";

import { AddPlacementButton } from "./AddPlacementButton";
import { FC } from "react";
import { PLACEMENTS } from "./placements";
import { TourForm } from "../../../types.d";

export const PlacementSection: FC<{
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
  return (
    <div>
      <h2>Параметры размещения</h2>
      <FieldArray name="placement.placements">
        {({ push, remove }: ArrayHelpers) => {
          return (
            <>
              <FormGroup>
                <ListGroup>
                  {map(
                    values.placement.placements,
                    ({ type, id, ...props }, index: number) => {
                      const { component: Component } = PLACEMENTS[type];
                      return (
                        <Component
                          key={id}
                          type={type}
                          id={id}
                          index={index}
                          values={values.placement.placements[index]}
                          // @ts-expect-error TS2532
                          errors={errors.placement?.placements[index]}
                          disabled={disabled}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onRemove={() => {
                            remove(index);
                          }}
                          setFieldValue={setFieldValue}
                          {...omit(props, ['index', 'disabled', 'onChange', 'onBlur', 'onRemove', 'setFieldValue'])}
                        />
                      );
                    }
                  )}
                </ListGroup>
              </FormGroup>
              <FormGroup>
                <AddPlacementButton
                  disabled={disabled}
                  descriptors={Object.values(PLACEMENTS)}
                  onCreate={push}
                />
              </FormGroup>
            </>
          );
        }}
      </FieldArray>
    </div>
  );
};
