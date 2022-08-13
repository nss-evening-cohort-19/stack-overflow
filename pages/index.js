import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getQuestions } from '../api/questionData';
import QuestionCard from '../components/QuestionCard';
import SideBar from '../components/SideBar';

function Home() {
  const [questions, setQuestions] = useState([]);
  const { user } = useAuth();
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const getAllTheQuestions = () => {
    getQuestions(user.uid).then(setQuestions);
  };
  useEffect(() => {
    getAllTheQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = questions.filter((question) => Object.values(question).join('').toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredResults(filteredData);
    } else { setFilteredResults(questions); }
  };

  return (
    <>
      <div className="SideBar">
        <SideBar />
      </div>
      <div className="text-center my-4">
        <title>Stack Overflow</title>
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
      <div className="text-center my-4">
        <Link href="/questions/new" passHref>
          <Button variant="info">Ask Question</Button>
        </Link>
        <div className="d-flex flex-wrap justify-content-center">
          {questions.map((question) => (
            <QuestionCard key={question.firebaseKey} questionObj={question} onUpdate={getAllTheQuestions} />
          ))}
        </div>
      </div>
    </>
  );
}
export default Home;
