/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Button, Container, Form, Nav,
} from 'react-bootstrap';
import QuestionCard from './QuestionCard';
import { signOut } from '../utils/auth';
import { getQuestions } from '../api/questionData';

export default function NavBar() {
  const [questions] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = questions.filter((question) => Object.values(question).join('').toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredResults(filteredData);
    } else { setFilteredResults(questions); }
  };
  return (
    <NavBar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <NavBar.Brand>Meme Roster</NavBar.Brand>
        </Link>
        <NavBar.Toggle aria-controls="responsive-navbar-nav" />
        <NavBar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/team">
              <Nav.Link>Meme Team</Nav.Link>
            </Link>
            <Link passHref href="/teamStuff/new">
              <Nav.Link>Add a meme</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
            <Form.Control icon="search" placeholder="Search Questions" onChange={(e) => searchItems(e.target.value)} />
            {searchInput.length > 1 ? (
              <div className="d-flex flex-wrap">
                {filteredResults.map((question) => (
                  <QuestionCard key={question.firebaseKey} questionObj={question} onUpdate={getQuestions} />
                ))}
              </div>
            ) : (
              <div className="d-flex flex-wrap">
                {questions.map((question) => (
                  <QuestionCard key={question.firebaseKey} questionObj={question} onUpdate={getQuestions} />
                ))}
              </div>
            )}
          </Nav>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
}
