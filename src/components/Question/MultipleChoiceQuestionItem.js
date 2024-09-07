import React, { useState, useEffect } from 'react';
import './QuestionStyles.css';

function MultipleChoiceQuestionItem({ id, questionItem, onItemGrading, submitted, clearAnswers }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        if (clearAnswers) {
          setSelectedAnswer(null); // Reset the selected answer when "Clear Answers" is clicked
        }
      }, [clearAnswers]);

  const handleChange = (event) => {
    const userAnswer = event.target.value;
    setSelectedAnswer(userAnswer);

    // Grade the answer (compare user's answer with the correct answer)
    const isCorrect = userAnswer[0] === questionItem.correctAnswer[0];
    console.log(`Question ${questionItem.questionNumber}: Selected answer is ${isCorrect ? 'correct' : 'incorrect'}`);
    
    // Pass the result to the parent
    onItemGrading(isCorrect);
    };
  return (
    <div className="multiple-choice-question question-item">
      <div className="question-text">{questionItem.questionNumber}. {questionItem.questionText}</div>
      {questionItem.questionOptions.map((option, index) => {
        const isCorrectAnswer = option[0] === questionItem.correctAnswer[0];
        const isSelected = option[0] === selectedAnswer;
        const isIncorrectAnswer = isSelected && option[0] !== questionItem.correctAnswer[0];

        let optionClass = "";
        if (submitted) {
          if (isCorrectAnswer) {
            optionClass = "correct-answer"; // Will apply green styling
          } else if (isIncorrectAnswer) {
            optionClass = "incorrect-answer"; // Will apply red styling
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
              disabled={submitted} 
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
