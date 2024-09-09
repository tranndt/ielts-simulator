import React, { useState, useEffect } from "react";
import SentenceCompletionQuestionItem from "./SentenceCompletionQuestionItem";
import DataTable from "../Table/DataTable";
import QuestionTaskDescription from "./QuestionTaskDescription";
import './QuestionStyles.css';

function SentenceCompletionQuestionTask({ id, questionTask, onTaskGrading, showAnswers }) {
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
    <div className="sentence-completion-question-task">
      <QuestionTaskDescription taskDescription={questionTask.taskDescription} />
      {/* <DataTable data={questionTask.questionContent} /> */}
      <h3 style={{textAlign:'center'}}>{questionTask.questionTitle}</h3>
      {questionTask.questionContent.map((content, index) => (
        <p>{content}</p>
      ))}
      <div class='your-answers-text'>Your Answers:</div>
      {questionTask.questions.map((questionItem, index) => (
        <SentenceCompletionQuestionItem
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

export default SentenceCompletionQuestionTask;
