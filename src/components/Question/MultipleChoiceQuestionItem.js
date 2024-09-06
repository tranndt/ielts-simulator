import React, { useState } from 'react';
import './QuestionStyles.css';

function MultipleChoiceQuestionItem({ id, questionItem, onItemGrading }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const isCorrectAnswer = (userAnswer, correctAnswer) => {
    // If the correct answer is an array, then compare user answer with the first element
    if (Array.isArray(correctAnswer)) {
      return userAnswer === correctAnswer[0];
    }
    return userAnswer === correctAnswer;
  }

  const handleChange = (event) => {
    const userAnswer = event.target.value;
    setSelectedAnswer(userAnswer);
    // Pass the result to the parent
    onItemGrading(isCorrectAnswer(userAnswer, questionItem.correctAnswer));
  };

  return (
    <div className="multiple-choice-question question-item">
      <div className="question-text">{questionItem.questionNumber}. {questionItem.questionText}</div>
      {questionItem.questionOptions.map((option, index) => (
        <div key={index}>
          <input 
            type="radio" 
            id={`option-${questionItem.questionNumber}-${index}`} 
            name={`mcq-${questionItem.questionNumber}`} 
            value={option[0]} 
            onChange={handleChange} 
          />
          <label htmlFor={`option-${questionItem.questionNumber}-${index}`}>
            {option[0]}. {option[1]}
          </label>
        </div>
      ))}
    </div>
  );
}

export default MultipleChoiceQuestionItem;

  
  