import React, { useState } from "react";
import MultipleChoiceQuestionItem from "./MultipleChoiceQuestionItem";
import QuestionTaskDescription from "./QuestionTaskDescription";
import './QuestionStyles.css';

function MultipleChoiceQuestionTask({ id, questionTask, onTaskGrading }) {
  const handleItemGrading = (isCorrect) => {
    onTaskGrading(isCorrect ? 1 : 0);
  };

  return (
    <div className="multiple-choice-question-task">
      <QuestionTaskDescription taskDescription={questionTask.taskDescription}/>
      {questionTask.questions.map((questionItem, index) => (
        <MultipleChoiceQuestionItem 
          key={index} 
          id={index} 
          questionItem={questionItem} 
          onItemGrading={handleItemGrading} 
        />
      ))}
    </div>
  );
}

export default MultipleChoiceQuestionTask;

