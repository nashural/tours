import { FC } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Guide } from "../../api/types";
import { Link } from "react-router-dom";
import { map } from "lodash";

export const GuidesList: FC<{ guides: Guide[] }> = ({ guides }) => {
  return (
    <ListGroup>
      {map(guides, ({ id, name }: Guide) => {
        return (
          <ListGroupItem key={id}>
            <Link to={`/guides/${id}`}>{name}</Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};
