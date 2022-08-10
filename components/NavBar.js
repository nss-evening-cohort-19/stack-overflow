/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

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
        <Button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </Button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link">
                  Home
                </a>
              </Link>
              <Link passHref href="/questions/new">
                <a className="nav-link">
                  Add a Question
                </a>
              </Link>
            </li>
            <Button type="button" className="btn btn-danger" onClick={signOut}>
              Sign Out
            </Button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
