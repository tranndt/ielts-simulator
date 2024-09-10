import React, { useState, useEffect } from 'react';
import './QuestionStyles.css';

function MultipleChoiceSelectManyQuestionItem({ id, questionItem, onItemGrading, showAnswers, correctAnswers, selectedAnswers, onSelectionChange }) {
    const [itemIsSelected, setItemIsSelected] = useState(false);
    const itemIsCorrect = correctAnswers.map((answer) => answer[0]).includes(questionItem[0]);
    const [optionClass, setOptionClass] = useState("");

  const handleChange = (event) => {
    setItemIsSelected(event.target.checked);
    onSelectionChange(event.target.checked, questionItem[0]);
  };

  useEffect(() => {
    if (showAnswers) {
      onItemGrading(itemIsCorrect && itemIsSelected);
      if (itemIsCorrect && itemIsSelected) {
        setOptionClass("correct-answer"); // green
      }
      else if (itemIsCorrect && !itemIsSelected) {
        setOptionClass("correct-unselected-answer"); // red
      }
      else if (itemIsSelected) {
        setOptionClass("incorrect-answer"); // red
      }
    }
    else {
      setOptionClass("");
    }

  }, [showAnswers, itemIsSelected]);
  
  return (
    <tr className={`multiple-choice-select-many-question question-item ${optionClass}`} style={{ display: 'flex', flexDirection: 'row', alignContent:'center'}}>
      <td style={{width:'2em', textAlign:'center'}}> 
        <input 
          type="checkbox" 
          onChange={handleChange} 
          disabled={showAnswers || (selectedAnswers.length >= correctAnswers.length && !selectedAnswers.map((answer) => answer[0]).includes(questionItem[0]))}
        />
      </td>
      <td style={{width:'2em', textAlign: 'center'}}>
        <div className="question-text">{questionItem[0]}</div>
      </td>
      <td>
        <div className="question-text">{questionItem[1]}</div>
      </td>
    </tr>
  );
}

export default MultipleChoiceSelectManyQuestionItem;