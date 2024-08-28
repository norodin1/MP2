import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import "./NavComponent.css";

export const NavComponent = () => {
  const logoUrl = "/images/PokeMan.png";
  return (
    <Navbar expand="lg">
      <Container className="navlink-wraper">
        <Navbar.Brand href="#home">
          <Image src={logoUrl} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav variant="underline">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">API Source</Nav.Link>
            <NavDropdown title="Mini Game" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Who's That Pokemon!
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
