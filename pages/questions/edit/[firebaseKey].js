import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import QuestionForm from '../../../components/form/QuestionForm';
import { getSingleQuestions } from '../../../api/questionData';

export default function EditQuestion() {
  const [editQuestions, setEditQuestions] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleQuestions(firebaseKey).then(setEditQuestions);
  }, [firebaseKey]);
  return (
    <QuestionForm obj={editQuestions} />
  );
}
