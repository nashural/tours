import { EMAIL_IN_USE, NOT_EQUAL_PASSWORDS, USER_NOT_FOUND, findError, issetError } from '../api/errors'
import { FC, useState } from "react";
import { Form, Formik, FormikErrors, FormikProps } from "formik";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

import { APIError } from '../api/types';
import { Link } from "react-router-dom";
import { LoadingButton } from "../components/LoadingButton";
import { RegisterForm } from '../types'
import { Well } from '../components/Well';
import { useAccessTokenStorage } from "../hooks/useAccessTokenStorage";
import { useApiClient } from "../hooks/useApiClient";
import { useRefreshTokenStorage } from "../hooks/useRefreshTokenStorage";

const initialValues: RegisterForm = {
  name: '',
  email: '',
  password: '',
  password2: ''
}

export const Register: FC<{}> = () => {
  const apiClient = useApiClient();
  const accessTokenStorage = useAccessTokenStorage();
  const refreshTokenStorage = useRefreshTokenStorage();
  const [serverErrors, setServerErrors] = useState<APIError[]>([]);

  const handleValidation = ({ name, email, password, password2 }: RegisterForm) => {
    const errors: FormikErrors<RegisterForm> = {}

    if (String(name).trim().length === 0) {
      errors.name = "Укажите свое имя"
    }

    if (String(email).trim().length === 0) {
      errors.email = "Укажите email"
    }

    if (String(password).trim().length === 0) {
      errors.password = 'Придумайте пароль'
    }

    if (String(password2).trim().length === 0) {
      errors.password2 = 'Повторите пароль'
    } else
    if (password !== password2) {
      errors.password2 = 'Пароли не совпадают'
    }

    return errors
  }

  const handleSubmit = async (values: RegisterForm) => {
    // @ts-expect-error TS2339
    const { errors, accessToken, refreshToken } = await apiClient.register(
      values
    );
    if (errors) {
      setServerErrors(errors)
    } else {
      accessTokenStorage.setToken(accessToken);
      refreshTokenStorage.setToken(refreshToken);
      window.location.href = "/";
    }
  };

  return (
    <Formik initialValues={initialValues} validate={handleValidation} isInitialValid={false} onSubmit={handleSubmit}>{({values, errors, isSubmitting, isValid, handleChange, handleBlur}: FormikProps<RegisterForm>) => {
      return (
        <Well>
          <Form>
            <FormGroup>
              <h1>Регистрация</h1>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={values.name}
                disabled={isSubmitting}
                invalid={Boolean(errors.name)}
                placeholder="Иван Иванович"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {Boolean(errors.name) && <FormFeedback>{errors.name}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={values.email}
                disabled={isSubmitting}
                invalid={Boolean(errors.email) || issetError(serverErrors, EMAIL_IN_USE)}
                placeholder="nashural@mail.ru"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {issetError(serverErrors, EMAIL_IN_USE) && (
                <FormFeedback>{findError(serverErrors, USER_NOT_FOUND)?.title}</FormFeedback>
              )}
              {Boolean(errors.email) && <FormFeedback>{errors.email}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={values.password}
                disabled={isSubmitting}
                invalid={Boolean(errors.password) || issetError(serverErrors, NOT_EQUAL_PASSWORDS)}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {issetError(serverErrors, NOT_EQUAL_PASSWORDS) && (
                <FormFeedback>{findError(serverErrors, NOT_EQUAL_PASSWORDS)?.title}</FormFeedback>
              )}
              {Boolean(errors.password) && <FormFeedback>{errors.password}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password2">Пароль еще раз</Label>
              <Input
                id="password2"
                type="password"
                name="password2"
                value={values.password2}
                disabled={isSubmitting}
                invalid={Boolean(errors.password2)}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {Boolean(errors.password2) && <FormFeedback>{errors.password2}</FormFeedback>}
            </FormGroup>
            <FormGroup style={{ marginTop: '10px' }}>
              <LoadingButton
                block
                loading={isSubmitting}
                disabled={isSubmitting || !isValid}
                color="primary"
              >Зарегистрироваться</LoadingButton>
            </FormGroup>
            <hr />
            <FormGroup>
                <Link to="/login">Войти</Link>
              </FormGroup>
          </Form>
        </Well>
      )
    }}</Formik>
  )
}
