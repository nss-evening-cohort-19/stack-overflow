/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState } from 'react';
import Link from 'next/link';

import { signOut } from '../utils/auth';

export default function NavBar() {
  // const [questions] = useState([]);
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
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            Stack-OverFill
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link">
                  Home
                </a>
              </Link>
              <Link passHref href="/">
                <a className="nav-link">
                  Questions
                </a>
              </Link>
              <Link passHref href="/">
                <a className="nav-link">
                  Add a Question
                </a>
              </Link>
              {/* <Link passHref href="/">
                <a className="nav-link">
                  Tags
                </a>
              </Link>
              <Link passHref href="/">
                <a className="nav-link">
                  Users
                </a>
              </Link>
              <Link passHref href="/">
                <a className="nav-link">
                  Companies
                </a>
              </Link> */}
            </li>
            <button type="button" className="btn btn-danger" onClick={signOut}>
              Sign Out
            </button>
          </ul>
        </div>
        {/* <form inLine>
          <form icon="search" placeholder="Search Questions" onChange={(e) => searchItems(e.target.value)} />
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
        </form> */}
      </div>
    </nav>
  );
}
