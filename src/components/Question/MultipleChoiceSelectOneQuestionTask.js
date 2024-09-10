import React, { useState, useEffect } from "react";
import MultipleChoiceSelectOneQuestionItem from "./MultipleChoiceSelectOneQuestionItem";
import QuestionTaskDescription from "./QuestionTaskDescription";
import './QuestionStyles.css';

function MultipleChoiceSelectOneQuestionTask({ id, questionTask, onTaskGrading, showAnswers }) {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleItemGrading = (isCorrect) => {
    // Increment or decrement based on whether the answer is correct or incorrect
    setCorrectAnswers((prevCorrect) => prevCorrect + (isCorrect ? 1 : 0));
    onTaskGrading(isCorrect);  // Notify parent of each individual grading event
  };

  useEffect(() => {
    if (!showAnswers) {
      setCorrectAnswers(0);  // Reset correct answers when hiding answers
    }
  }, [showAnswers]);

  return (
    <div className="multiple-choice-question-task">
      <QuestionTaskDescription taskDescription={questionTask.taskDescription} />
      {questionTask.questions.map((questionItem, index) => (
        <MultipleChoiceSelectOneQuestionItem
          key={index}
          id={index}
          questionItem={questionItem}
          onItemGrading={handleItemGrading}
          showAnswers={showAnswers}
        />
      ))}
      {showAnswers && (
        <div className="task-score">
          Task Score: {correctAnswers} / {questionTask.questions.length}
        </div>
      )}
    </div>
  );
}

export default MultipleChoiceSelectOneQuestionTask;
