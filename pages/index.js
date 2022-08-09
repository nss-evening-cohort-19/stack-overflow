import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getQuestions } from '../api/questionData';
import QuestionCard from '../components/QuestionCard';

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
    <div className="text-center my-4">
      <title>All Questions</title>
      <div className="d-flex flex-wrap">
        {questions.map((question) => (
          <QuestionCard key={question.firebaseKey} questionObj={question} onUpdate={getAllTheQuestions} />
        ))}
      </div>
    </div>
  );
}
export default Home;
