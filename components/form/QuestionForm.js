import { useRouter } from 'next/router';
import PropTypes, { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FloatingLabel, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createQuestions, updateQuestions } from '../../api/questionData';

const initialState = {
  title: '',
  description: '',
};

function QuestionForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (object.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateQuestions(formInput)
        .then(() => router.push('/questions/new'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createQuestions(payload).then(() => {
        router.push('/questions/new');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} public question</h2>

      <FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Description"
          name="description"
          value={formInput.description}
          style={{ height: '100px' }}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Question</Button>
    </Form>
  );
}

QuestionForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

QuestionForm.defaultProps = {
  obj: initialState,
};

export default QuestionForm;
