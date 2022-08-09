import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '../utils/context/authContext';
import { getQuestions } from '../api/questionData';
// import QuestionCard from '../components/QuestionCard';

const isBrowser = typeof window !== 'undefined';

const QuestionCard = dynamic(
  () => import('../components/QuestionCard'),
  { ssr: false },
);

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

  return isBrowser ? (
    <div className="text-center my-4">
      <title>All Questions</title>
      <div className="d-flex flex-wrap">
        {questions.map((question, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <QuestionCard key={i} questionObj={question} onUpdate={getAllTheQuestions} />
        ))}
      </div>
    </div>
  ) : null;
}
export default Home;
