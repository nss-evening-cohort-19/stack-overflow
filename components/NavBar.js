/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import {
  Button, Container, Form, Nav,
} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../utils/context/authContext';
import QuestionCard from './QuestionCard';
import { signOut } from '../utils/auth';
import { getQuestions } from '../api/questionData';

export default function NavBar() {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);

  const getAllTheQuestions = () => {
    getQuestions(user.uid).then(setQuestions);
  };

  useEffect(() => {
    getAllTheQuestions();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = questions.filter((question) => Object.values(question).join('').toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredResults(filteredData);
    } else { setFilteredResults(questions); }
  };
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Stack Overfill</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/questions/new">Add a question</Nav.Link>
          <Nav.Link href="/pages/about.js">about</Nav.Link>
        </Nav>
      </Container>
      <div className="text-center my-4">
        <Form.Control icon="search" placeholder="Search Questions" onChange={(e) => searchItems(e.target.value)} />
        {searchInput.length > 1 ? (
          <div className="d-flex flex-wrap">
            {filteredResults.map((question) => (
              <QuestionCard key={question.firebaseKey} questionObj={question} onUpdate={getAllTheQuestions} />
            ))}
          </div>
        ) : (
          <div className="d-flex flex-wrap">
            {questions.map((question) => (
              <QuestionCard key={question.firebaseKey} questionObj={question} onUpdate={getAllTheQuestions} />
            ))}
          </div>
        )}

      </div>
      <Button type="button" className="btn btn-primary btn-lg copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </Navbar>
  );
}
