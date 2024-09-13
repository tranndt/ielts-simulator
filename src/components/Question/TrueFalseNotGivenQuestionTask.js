import React, { useState, useEffect } from "react";
import TrueFalseNotGivenQuestionItem from "./TrueFalseNotGivenQuestionItem";
import QuestionTaskDescription from "./QuestionTaskDescription";
import './QuestionStyles.css';

function TrueFalseNotGivenQuestionTask({ id, questionTask, onTaskGrading, showAnswers }) {
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
    <div className="true-false-notgiven-question-task">
      <h3>{questionTask.taskQuestionNumberText}</h3>
      <QuestionTaskDescription taskDescription={questionTask.taskDescription} />
      <table>
        <tbody>
          {questionTask.questionItems.map((questionItem, index) => (
            <TrueFalseNotGivenQuestionItem
              key={index}
              id={index}
              questionItem={questionItem}
              onItemGrading={handleItemGrading}
              showAnswers={showAnswers}
              />
          ))}
        </tbody>
      </table>
      <div className="task-score">
        {showAnswers ? `Task Score: ${correctAnswers} / ${questionTask.questionItems.length}` : " "}
      </div>
    </div>
  );
}

export default TrueFalseNotGivenQuestionTask;
