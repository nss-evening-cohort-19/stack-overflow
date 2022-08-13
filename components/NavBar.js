/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import Link from 'next/link';
import {
  Button, Container, Nav,
} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
// import { useAuth } from '../utils/context/authContext';
// import QuestionCard from './QuestionCard';
import { signOut } from '../utils/auth';
// import { getQuestions } from '../api/questionData';

export default function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Stack Overflow</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/questions/new">Add a question</Nav.Link>
          <Nav.Link href="/pages/about.js">About</Nav.Link>
        </Nav>
      </Container>
      <Button type="button" className="btn btn-primary btn-lg copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </Navbar>
  );
}
