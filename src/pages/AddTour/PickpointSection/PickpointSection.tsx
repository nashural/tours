import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

import { FC } from "react";
import { FormikErrors } from "formik";
import { PickpointInput } from "./PickpointInput";
import { PickpointMap } from "./PickpointMap";
import { TourForm } from "../../../types";
import { first } from "lodash";

export const PickpointSection: FC<{
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
      <h2>Точка сбора</h2>
      <FormGroup>
        <Label htmlFor="pickpoint_address">Адрес точки сбора</Label>
        <PickpointInput
          id="pickpoint_address"
          name="pickpoint.address"
          value={values.pickpoint?.address}
          error={errors.pickpoint?.address}
          disabled={disabled}
          onChange={(selected) => {
            if (selected.length === 1) {
              const { value, data } = first(selected) || {};
              setFieldValue("pickpoint.address", value);
              setFieldValue("pickpoint.coordinates", [
                Number(data.geo_lat),
                Number(data.geo_lon)
              ]);
            }
          }}
          onBlur={handleBlur}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="pickpoint_time">Время сбора</Label>
        <Input
          id="pickpoint_time"
          name="pickpoint.time"
          type="time"
          invalid={Boolean(errors.pickpoint?.time)}
          value={values.pickpoint.time}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFeedback invalid={Boolean(errors.pickpoint?.time)}>
          {errors.pickpoint?.time}
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="pickpoint_comment">Комментарий к точке сбора</Label>
        <Input
          id="pickpoint_comment"
          name="pickpoint.comment"
          type="text"
          value={values.pickpoint?.comment}
          invalid={Boolean(errors.pickpoint?.comment)}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFeedback invalid={Boolean(errors.pickpoint?.comment)}>
          {errors.pickpoint?.comment}
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <PickpointMap center={values.pickpoint.coordinates} />
      </FormGroup>
    </div>
  );
};
