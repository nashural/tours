import { FC, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { PASSWORD_MISMATCH, USER_NOT_FOUND, findError, issetError } from '../api/errors'

import { APIError } from '../api/types';
import { Link } from "react-router-dom";
import { LoadingButton } from "../components/LoadingButton";
import { LoginForm } from "../types";
import { Well } from "../components/Well";
import { useAccessTokenStorage } from "../hooks/useAccessTokenStorage";
import { useApiClient } from "../hooks/useApiClient";
import { useRefreshTokenStorage } from "../hooks/useRefreshTokenStorage";

const initialValues: LoginForm = {
  email: "",
  password: ""
};

export const Login: FC<{}> = () => {
  const apiClient = useApiClient();
  const accessTokenStorage = useAccessTokenStorage();
  const refreshTokenStorage = useRefreshTokenStorage();
  const [serverErrors, setServerErrors] = useState<APIError[]>([]);

  const handleSubmit = async (values: LoginForm) => {
    // @ts-expect-error TS2339
    const { errors, accessToken, refreshToken } = await apiClient.login(
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
    <Formik initialValues={initialValues} isInitialValid={false} onSubmit={handleSubmit}>
      {({ values, isSubmitting, isValid, handleChange, handleBlur }: FormikProps<LoginForm>) => {
        return (
          <Well>
            <Form>
              <FormGroup>
                <h1>Вход</h1>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  disabled={isSubmitting}
                  invalid={issetError(serverErrors, USER_NOT_FOUND)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {issetError(serverErrors, USER_NOT_FOUND) && (
                  <FormFeedback>{findError(serverErrors, USER_NOT_FOUND)?.title}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={values.password}
                  disabled={isSubmitting}
                  invalid={issetError(serverErrors, PASSWORD_MISMATCH)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {issetError(serverErrors, PASSWORD_MISMATCH) && (
                  <FormFeedback>{findError(serverErrors, PASSWORD_MISMATCH)?.title}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup style={{ marginTop: '10px' }}>
                <LoadingButton
                  block
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid}
                  color="primary"
                >
                  Войти
                </LoadingButton>
              </FormGroup>
              <hr />
              <FormGroup>
                <Link to="/register">Регистрация</Link>
              </FormGroup>
            </Form>
          </Well>
        );
      }}
    </Formik>
  );
};
