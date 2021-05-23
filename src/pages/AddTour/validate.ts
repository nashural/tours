import {
  TourForm,
  TourPickpoint,
  TourPlacement,
  TourPlacementItem
} from "../../types";

import { FormikErrors } from "formik";
import { PLACEMENTS } from "./PlacementSection/placements";
import { isEmpty } from "lodash";
import { isValid } from "date-fns";

const validateTime = (time: string) => {
  if (!time) return "Время должно быть указано";

  const [hoursStr, minutesStr] = time.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (hours < 0) {
    return "Часы должны быть положительным числом";
  } else if (hours > 24) {
    return "Часов не может быть больше 24";
  }

  if (minutes < 0) {
    return "Минуты должны быть положительным числом";
  } else if (minutes > 60) {
    return "Минут не может быть больше 60";
  }

  return undefined;
};

const validatePickpoint = ({ address, time }: TourPickpoint) => {
  const errors: FormikErrors<TourPickpoint> = {};

  if (!address) {
    errors.address = "Введите адрес места встречи";
  }

  const timeError = validateTime(time);
  if (!isEmpty(timeError)) {
    errors.time = timeError;
  }

  return errors;
};

const validatePlacement = (placement: TourPlacementItem) => {
  const { type } = placement;
  const { validate } = PLACEMENTS[type];

  return validate(placement);
};

const validatePlacements = ({ placements }: TourPlacement) => {
  const errors: FormikErrors<TourPlacement> = {};

  errors.placements = [];

  for (let i = 0; i < placements.length; i++) {
    const placement = placements[i];

    const placementErrors = validatePlacement(placement);
    if (!isEmpty(placementErrors)) {
      errors.placements[i] = placementErrors;
    }
  }

  if (isEmpty(errors.placements)) {
    delete errors.placements;
  }

  return errors;
};

export const validate = ({
  name,
  date,
  price,
  count,
  description,
  shedule,
  pickpoint,
  placement
}: TourForm) => {
  const errors: FormikErrors<TourForm> = {};

  if (name.length < 1) {
    errors.name = "Название экскурсии должно быть указано";
  }

  if (!isValid(new Date(date))) {
    errors.date = "Дата должна быть в формате ДД.ММ.ГГГГ";
  }

  if (!price) {
    errors.price = "Стоимость должна быть указана";
  } else if (parseInt(price, 10) < 0) {
    errors.price = "Цена должна быть положительным числом";
  }

  if (!count) {
    errors.count = "Количество человек должно быть указано";
  } else if (parseInt(count, 10) < 1) {
    errors.count = "Количество человек должно быть хотя-бы 1";
  }

  if (description.length < 1) {
    errors.description = "Описание экскурсии должно быть заполнено";
  }

  if (shedule.length < 1) {
    errors.shedule = "Программа экскурсии должна быть заполнена";
  }

  const pickpointErrors = validatePickpoint(pickpoint);
  if (!isEmpty(pickpointErrors)) {
    errors.pickpoint = pickpointErrors;
  }

  const placementErrors = validatePlacements(placement);
  if (!isEmpty(placementErrors)) {
    errors.placement = placementErrors;
  }

  return errors;
};
