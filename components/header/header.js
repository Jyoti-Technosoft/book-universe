import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function header() {
  const elementStyle = {
    "--bs-bg-opacity": 0,
    fontSize: "medium",
  };

  return (
    <Navbar
      expand="xl"
      className="bg-body-tertiary"
      data-bs-theme="dark"
      style={elementStyle}
    >
      <Container>
        <Navbar.Brand
          href="/"
          style={{ font: "caption", fontSize: "xx-large" }}
        >
          Book Universe
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{
            flexGrow: "0",
          }}
        >
          <Nav className="me-auto">
            <Nav.Link href="/savedBooks">Saved Books</Nav.Link>
            <Nav.Link href="/addBook">Add Books</Nav.Link>
            <Nav.Link href="/books">Explore Books</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default header;
