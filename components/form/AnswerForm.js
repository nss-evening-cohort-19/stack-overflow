import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateAnswer, addAnswer } from '../../api/answerData';

const initialState = {
  description: '',
};

const AnswerForm = ({ obj }) => {
  // eslint-disable-next-line no-console
  console.log('obj value ===', obj);
  const [formInput, setFormInput] = useState(initialState);
  const [answers, setAnswers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
      if (obj && obj?.answer && obj?.answer.length) {
        setAnswers(obj.answer);
      }
    }
  }, [obj]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      answer: answers.concat([value]),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      // eslint-disable-next-line no-console
      console.log('form value ===', formInput, answers);
      updateAnswer(formInput)
        .then(() => router.push(`/answer/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      addAnswer(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="answer-grid">
      <h4 className="answer-form">{obj.firebaseKey ? 'Enter' : 'Enter'} Your Answer</h4>
      <FloatingLabel controlId="floatingInput1" label="Your Answer" className="mb-3">
        <Form.Control type="text" placeholder="Enter Your Answer" name="answer" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <div className="answer-grid">
        <Button type="submit">{obj.firebaseKey ? 'Submit' : 'Submit'} Answers</Button>
      </div>
    </Form>
  );
};

AnswerForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    firebaseKey: PropTypes.string,

    answer: PropTypes.arrayOf(PropTypes.string),

    uid: PropTypes.string,

  }),
};

AnswerForm.defaultProps = {
  obj: initialState,
};

export default AnswerForm;
