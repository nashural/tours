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
import { Guide } from "../../api/types";
import { GuidesList } from "./GuidesList";
import { Bullseye } from "../../components/Bullseye";

export const Guides: FC<{}> = () => {
  const apiClient = useApiClient();
  const [isLoading, setIsLoading] = useState(true);
  const [guides, setGuides] = useState<Guide[]>([]);

  useEffect(() => {
    apiClient
      .getGuides()
      .then(setGuides)
      .then(() => {
        setIsLoading(false);
      });
  }, [apiClient]);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem active>Гиды</BreadcrumbItem>
      </Breadcrumb>
      {isLoading && (
        <Bullseye>
          <Spinner />
        </Bullseye>
      )}
      {!isLoading && guides.length === 0 && (
        <Jumbotron>
          <Button color="primary" tag={Link} to="/guides/add">
            Добавить гида
          </Button>
        </Jumbotron>
      )}
      {!isLoading && guides.length !== 0 && <GuidesList guides={guides} />}
    </>
  );
};
