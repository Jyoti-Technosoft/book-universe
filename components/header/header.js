import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import classes from './header.module.scss';

function Header() {
  const router = useRouter();

  const isActive = (path) => (router.pathname === path ? { color: '#c45f20' } : { color: '#FFFFFF' });

  const elementStyle = {
    '--bs-bg-opacity': 0,
    fontSize: 'medium',
  };

  return (
    <Navbar
      expand="xl"
      className="bg-body-tertiary"
      data-bs-theme="dark"
      style={elementStyle}
    >
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand
            className={classes.linkText}
            style={{
              font: 'caption',
              fontSize: 'xx-large',
              ...isActive('/'),
              userSelect: 'none',
            }}
          >
            Book Universe
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{
            flexGrow: '0',
          }}
        >
          <Nav className="me-auto">
            <Link href="/savedBooks" passHref>
              <Nav.Link
                className={classes.linkText}
                style={{ ...isActive('/savedBooks'), userSelect: 'none' }}
              >
                Saved Books
              </Nav.Link>
            </Link>
            <Link href="/addBook" passHref>
              <Nav.Link
                className={classes.linkText}
                style={{ ...isActive('/addBook'), userSelect: 'none' }}
              >
                Add Books
              </Nav.Link>
            </Link>
            <Link href="/books" passHref>
              <Nav.Link
                className={classes.linkText}
                style={{ ...isActive('/books'), userSelect: 'none' }}
              >
                Explore Books
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
