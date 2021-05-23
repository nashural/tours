import { FC } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Tour } from "../../api/types";
import { Link } from "react-router-dom";
import { map } from "lodash";

export const ToursList: FC<{ tours: Tour[] }> = ({ tours }) => {
  return (
    <ListGroup>
      {map(tours, ({ id, name }: Tour) => {
        return (
          <ListGroupItem key={id}>
            <Link to={`/tours/${id}`}>{name}</Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};
