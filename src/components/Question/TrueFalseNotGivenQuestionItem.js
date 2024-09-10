import React, { useState, useEffect } from 'react';
import './QuestionStyles.css';

function TrueFalseNotGivenQuestionItem({ id, questionItem, onItemGrading, showAnswers }) {
  const [userAnswer, setUserAnswer] = useState(null);
  const [optionClass, setOptionClass] = useState("");

  const handleChange = (event) => {
    setUserAnswer(event.target.value);
  };

  useEffect(() => {
    if (showAnswers) {
      const isCorrect = userAnswer === questionItem.correctAnswer;
      onItemGrading(isCorrect);
      if (isCorrect) {
        setOptionClass("correct-answer");
      } else {
        setOptionClass("incorrect-answer");
      }
    }
    else {
      setOptionClass("");
    }
  }, [showAnswers, userAnswer]);

  return (
    <tr className={`true-false-notgiven-question-item question-item`}
    style={{ display: 'flex', flexDirection: 'row', alignContent:'center', minHeight: '2.5em'}}>
      <td style={{width:'2em', textAlign:'center'}}>
        {questionItem.questionNumber}
      </td>
      <td style={{width:'26em'}}>
        {questionItem.questionText}
      </td>
      <td style={{width:'6em'}}>
        <select style={{width:'100%', textAlign:'center'}}
          name={`heading-${questionItem.questionNumber}`}
          id={`heading-${questionItem.questionNumber}`}
          onChange={handleChange}
          disabled={showAnswers}
        >
          <option value=""></option>
          {questionItem.questionOptions.map((heading, index) => (
            <option key={index} value={heading}>
              {heading}
            </option>
          ))}
        </select>
      </td>
      <td
        className={optionClass}
        style = {{marginLeft: '1.5em'}}>
        {showAnswers ? questionItem.correctAnswer : ""}
      </td>
    </tr>
  );
}

export default TrueFalseNotGivenQuestionItem;