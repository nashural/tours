import { FC, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { FormGroup, Input, Label } from "reactstrap";

import { Link } from "react-router-dom";
import { LoadingButton } from "../components/LoadingButton";
import { LoginForm } from "../types";
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
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (values: LoginForm) => {
    setIsSaving(true);
    try {
      // @ts-expect-error TS2339
      const { error, accessToken, refreshToken } = await apiClient.login(
        values
      );
      if (error) {
      } else {
        accessTokenStorage.setToken(accessToken);
        refreshTokenStorage.setToken(refreshToken);
        window.location.href = "/";
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, handleBlur }: FormikProps<LoginForm>) => {
        return (
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
                disabled={isSaving}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={values.password}
                disabled={isSaving}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormGroup>
            <FormGroup>
              <LoadingButton
                loading={isSaving}
                disabled={isSaving}
                block
                color="primary"
              >
                Войти
              </LoadingButton>
            </FormGroup>
            <FormGroup>
              <Link to="/register">Регистрация</Link>
            </FormGroup>
            <FormGroup>
              <Link to="/recover">Восстановление пароля</Link>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};
