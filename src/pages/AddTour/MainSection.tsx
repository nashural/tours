import { FC } from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { FormikErrors } from "formik";
import DatePicker from "reactstrap-date-picker2";
import { TourForm } from "../../types";

export const MainSection: FC<{
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
      <FormGroup>
        <Label htmlFor="name">Название экскурсии</Label>
        <Input
          id="name"
          type="text"
          name="name"
          invalid={Boolean(errors.name)}
          value={values.name}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFeedback>{errors.name}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="date">Дата проведения</Label>
        <DatePicker
          id="date"
          name="date"
          value={values.date}
          invalid={Boolean(errors.date)}
          placeholder="ДД.ММ.ГГГГ"
          dateFormat="DD.MM.YYYY"
          minDate={new Date().toISOString()}
          disabled={disabled}
          onChange={(date: string) => {
            setFieldValue("date", date);
          }}
        />
        <FormFeedback>{errors.date}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="price">Стоимость с человека</Label>
        <Input
          id="price"
          type="number"
          name="price"
          value={values.price}
          invalid={Boolean(errors.price)}
          min="0"
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFeedback>{errors.price}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="price">Максимальное количество человек</Label>
        <Input
          id="count"
          type="number"
          name="count"
          value={values.count}
          invalid={Boolean(errors.count)}
          min="1"
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFeedback>{errors.count}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="description">Описание</Label>
        <Input
          id="description"
          type="textarea"
          name="description"
          value={values.description}
          invalid={Boolean(errors.description)}
          rows={4}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFeedback>{errors.description}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="details">Организационные детали</Label>
        <Input
          id="details"
          type="textarea"
          name="details"
          value={values.details}
          rows={4}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="shedule">Программа</Label>
        <Input
          id="shedule"
          type="textarea"
          name="shedule"
          value={values.shedule}
          invalid={Boolean(errors.shedule)}
          rows={4}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormFeedback>{errors.shedule}</FormFeedback>
      </FormGroup>
    </div>
  );
};
