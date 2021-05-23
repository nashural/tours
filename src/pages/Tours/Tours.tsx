import { FC, useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Jumbotron,
  Button,
  Spinner
} from "reactstrap";
import { Link } from "react-router-dom";
import { useApiClient } from "../../hooks/useApiClient";
import { Tour } from "../../api/types";
import { ToursList } from "./ToursList";
import { Bullseye } from "../../components/Bullseye";

export const Tours: FC<{}> = () => {
  const apiClient = useApiClient();
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    apiClient
      .getTours()
      .then(setTours)
      .then(() => {
        setIsLoading(false);
      });
  }, [apiClient]);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem active>Экскурсии</BreadcrumbItem>
      </Breadcrumb>
      {isLoading && (
        <Bullseye>
          <Spinner />
        </Bullseye>
      )}
      {!isLoading && tours.length === 0 && (
        <Jumbotron>
          <h1>Создайте свою первую экскурсию на портале Наш Урал</h1>
          <p>Комплектуйте горячие туры аудиторией с Нашего Урала</p>
          <Button color="primary" tag={Link} to="/tours/add">
            Добавить экскурсию
          </Button>
        </Jumbotron>
      )}
      {!isLoading && tours.length !== 0 && <ToursList tours={tours} />}
    </>
  );
};
