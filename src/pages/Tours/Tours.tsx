import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Jumbotron,
  Spinner
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";

import { Bullseye } from "../../components/Bullseye";
import { FC } from "react";
import { Toolbar } from '../../components/Toolbar'
import { Tour } from "../../api/types";
import { ToursList } from "./ToursList";
import { useApiClient } from "../../hooks/useApiClient";
import { useQuery } from 'react-query'

export const Tours: FC<{}> = () => {
  const apiClient = useApiClient();
  const { data: tours, isLoading } = useQuery('tours', () => apiClient.getTours())
  const history = useHistory()

  const handleAddTour = () => {
    history.push('/tours/add')
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem active>Экскурсии</BreadcrumbItem>
      </Breadcrumb>
      <Toolbar>
        <Button disabled={isLoading} onClick={handleAddTour}>Добавить экскурсию</Button>
      </Toolbar>
      <hr />
      {isLoading && (
        <Bullseye>
          <Spinner />
        </Bullseye>
      )}
      {!isLoading && (tours as Tour[]).length === 0 && (
        <Jumbotron>
          <h1>Создайте свою первую экскурсию на портале Наш Урал</h1>
          <p>Комплектуйте горячие туры аудиторией с Нашего Урала</p>
          <Button color="primary" tag={Link} to="/tours/add">
            Добавить экскурсию
          </Button>
        </Jumbotron>
      )}
      {!isLoading && (tours as Tour[]).length !== 0 && <ToursList tours={tours as Tour[]} />}
    </>
  );
};
