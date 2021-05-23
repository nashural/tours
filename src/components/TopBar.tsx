import { FC } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";

import "./TopBar.css";

export const TopBar: FC<{}> = () => {
  return (
    <Navbar color="light" light expand="md" className="TopBar">
      <Container>
        <NavbarBrand>
          <strong>Экскурсии</strong> с Нашим Уралом
        </NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink tag={Link} to="/guides">
              Гиды
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/tours">
              Экскурсии
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};
