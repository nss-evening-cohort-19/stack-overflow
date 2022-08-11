/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState } from 'react';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { signOut } from '../utils/auth';

export default function NavBar() {
  // const [filteredResults, setFilteredResults] = useState([]);
  // const [searchInput, setSearchInput] = useState('');

  // const searchItems = (searchValue) => {
  //   setSearchInput(searchValue);
  //   if (searchInput !== '') {
  //     const filteredData = questions.filter((question) => Object.values(question).join('').toLowerCase().includes(searchInput.toLowerCase()));
  //     setFilteredResults(filteredData);
  //   } else { setFilteredResults(questions); }
  // };
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Stack Overfill</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/questions/new">Add a question</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Container>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search..."
          className="me-2"
          aria-label="Search"
        />
      </Form>
      <button type="button" className="btn btn-primary btn-lg copy-btn" onClick={signOut}>
        Sign Out
      </button>
    </Navbar>
  );
}
