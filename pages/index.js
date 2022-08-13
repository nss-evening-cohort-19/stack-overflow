import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getQuestions } from '../api/questionData';
import QuestionCard from '../components/QuestionCard';
import SideBar from '../components/SideBar';

function Home() {
  const [questions, setQuestions] = useState([]);
  const { user } = useAuth();
  const getAllTheQuestions = () => {
    getQuestions(user.uid).then(setQuestions);
  };
  useEffect(() => {
    getAllTheQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="SideBar">
        <SideBar />
      </div>
      <div className="text-center my-4">
        <title>Stack Overflow </title>
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
