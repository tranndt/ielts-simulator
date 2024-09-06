import React, { useState } from 'react';
import MatchingHeadingsQuestionItem from '../Question/MatchingHeadingsQuestionItem';
import mcqData from '../assets/json/matching_headings.json';

const GradingComponent = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
    console.log(mcqData);
  const handleAnswerChange = (questionNumber, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionNumber]: answer,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let correctAnswers = 0;

    mcqData.questionsList.forEach((question) => {
      const correctAnswer = question.correctAnswer[0];
      const userAnswer = userAnswers[question.questionNumber];
      if (userAnswer === correctAnswer) {
        correctAnswers += 1;
      }
    });

    setScore(correctAnswers);
  };

  return (
    <div>
      <h1>Grading Component</h1>
      <form onSubmit={handleSubmit}>
        {mcqData.questionsList.map((question) => (
          <MatchingHeadingsQuestionItem
            key={question.questionNumber}
            questionNumber={question.questionNumber}
            questionText={question.questionText}
            questionOptions={question.questionOptions}
            correctAnswer={question.correctAnswer}
            onAnswerChange={handleAnswerChange}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
      {score !== null && <p>Your score: {score} / {mcqData.questionsList.length}</p>}
    </div>
  );
};

export default GradingComponent;