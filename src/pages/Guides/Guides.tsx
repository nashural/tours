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
import { Guide } from "../../api/types";
import { GuidesList } from "./GuidesList";
import { Toolbar } from '../../components/Toolbar'
import { useApiClient } from "../../hooks/useApiClient";
import { useQuery } from 'react-query'

export const Guides: FC<{}> = () => {
  const apiClient = useApiClient();
  const { data: guides, isLoading } = useQuery('guides', () => apiClient.getGuides())
  const history = useHistory()

  const handleAddGuide = () => {
    history.push('/guides/add')
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem active>Гиды</BreadcrumbItem>
      </Breadcrumb>
      <Toolbar>
        <Button disabled={isLoading} onClick={handleAddGuide}>Добавить гида</Button>
      </Toolbar>
      <hr />
      {isLoading && (
        <Bullseye>
          <Spinner />
        </Bullseye>
      )}
      {!isLoading && (guides as Guide[]).length === 0 && (
        <Jumbotron>
          <Button color="primary" tag={Link} to="/guides/add">
            Добавить гида
          </Button>
        </Jumbotron>
      )}
      {!isLoading && (guides as Guide[]).length !== 0 && <GuidesList guides={guides as Guide[]} />}
    </>
  );
};
