import React, { useState, useEffect } from 'react';
import './QuestionStyles.css';

function MultipleChoiceQuestionItem({ id, questionItem, onItemGrading, showAnswers }) {
  const [userAnswer, setUserAnswer] = useState(null);

  const handleChange = (event) => {
    setUserAnswer(event.target.value);
    const isCorrect = userAnswer === questionItem.correctAnswer[0];
    // onItemGrading(isCorrect);
  };

  useEffect(() => {
    if (showAnswers && userAnswer !== null) {
      const isCorrect = userAnswer === questionItem.correctAnswer[0];
      onItemGrading(isCorrect);
    }
  }, [showAnswers, userAnswer]);

  return (
    <div className="multiple-choice-question question-item">
      <div className="question-text">{questionItem.questionNumber}. {questionItem.questionText}</div>
      {questionItem.questionOptions.map((option, index) => {
        const isCorrectAnswer = option[0] === questionItem.correctAnswer[0];
        const isSelected = option[0] === userAnswer;
        const isIncorrectAnswer = isSelected && !isCorrectAnswer;
        const isCorrectButUnselected = !isSelected && isCorrectAnswer;

        let optionClass = "";
        if (showAnswers) {
          if (isIncorrectAnswer) {
            optionClass = "incorrect-answer"; // red
          } else if (isSelected && isCorrectAnswer) {
            optionClass = "correct-answer"; // green
          } else if (isCorrectButUnselected) {
            optionClass = "correct-unselected-answer"; // yellow
          }
        }

        return (
          <div key={index} className={optionClass}>
            <input 
              type="radio" 
              id={`option-${questionItem.questionNumber}-${index}`} 
              name={`mcq-${questionItem.questionNumber}`} 
              value={option[0]} 
              onChange={handleChange} 
              disabled={showAnswers} 
            />
            <label htmlFor={`option-${questionItem.questionNumber}-${index}`}>
              {option[0]}. {option[1]}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default MultipleChoiceQuestionItem;