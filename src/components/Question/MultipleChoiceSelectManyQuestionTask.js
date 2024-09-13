import React, { useState, useEffect } from "react";
import MultipleChoiceSelectManyQuestionItem from "./MultipleChoiceSelectManyQuestionItem";
import QuestionTaskDescription from "./QuestionTaskDescription";
import './QuestionStyles.css';

function MultipleChoiceSelectManyQuestionTask({ id, questionTask, onTaskGrading, showAnswers }) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleItemGrading = (isCorrect) => {
    // Increment or decrement based on whether the answer is correct or incorrect
    setCorrectAnswers((prevCorrect) => prevCorrect + (isCorrect ? 1 : 0));
    onTaskGrading(isCorrect);  // Notify parent of each individual grading event
  };

  const handleSelectionChange = (isSelected, questionItem) => {
    // Add or remove the selected answer from the list
    setSelectedAnswers((prevAnswers) => {
      if (isSelected) {
        return [...prevAnswers, questionItem];
      } else {
        return prevAnswers.filter((answer) => answer !== questionItem);
      }
    });
  };

  useEffect(() => {
    if (!showAnswers) {
      setCorrectAnswers(0);  // Reset correct answers when hiding answers
    }
  }, [showAnswers,selectedAnswers]);

  return (
    <div className="multiple-choice-question-task">
      <h3>{questionTask.taskQuestionNumberText}</h3>
      <QuestionTaskDescription taskDescription={questionTask.taskDescription} />
      <table>
        <tbody>
            {questionTask.questionItems.map((questionItem, index) => (
            <MultipleChoiceSelectManyQuestionItem
              key={index}
              id={index}
              questionItem={questionItem}
              onItemGrading={handleItemGrading}
              showAnswers={showAnswers}
              correctAnswers={questionTask.correctAnswer}
              selectedAnswers={selectedAnswers}
              onSelectionChange={handleSelectionChange}
            />
          ))}
        </tbody>
      </table>
      <div className="task-score">
        {showAnswers ? `Task Score: ${correctAnswers} / ${questionTask.correctAnswer.length}` : " "}
      </div>
      
    </div>
  );
}

export default MultipleChoiceSelectManyQuestionTask;