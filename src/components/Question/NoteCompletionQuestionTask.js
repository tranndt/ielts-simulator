import React, { useState, useEffect } from "react";
import NoteCompletionQuestionItem from "./NoteCompletionQuestionItem";
import DataTable from "../Table/DataTable";
import QuestionTaskDescription from "./QuestionTaskDescription";
import './QuestionStyles.css';

function NoteCompletionQuestionTask({ id, questionTask, onTaskGrading, showAnswers }) {
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
    <div className="note-completion-question-task">
      <h3>{questionTask.taskQuestionNumberText}</h3>
      <QuestionTaskDescription taskDescription={questionTask.taskDescription} />
      {/* <DataTable data={questionTask.questionMainText} /> */}
      <h3 style={{textAlign:'center'}}>{questionTask.questionMainTitle}</h3>
      {questionTask.questionMainText.map((content, index) => (
        <p>{content}</p>
      ))}
      <div class='your-answers-text'>Your Answers:</div>
      {questionTask.questionItems.map((questionItem, index) => (
        <NoteCompletionQuestionItem
          key={index}
          id={index}
          questionItem={questionItem}
          onItemGrading={handleItemGrading}
          showAnswers={showAnswers}
        />
      ))}
      {showAnswers && (
        <div className="task-score">
          Task Score: {correctAnswers} / {questionTask.questionItems.length}
        </div>
      )}
    </div>
  );
}

export default NoteCompletionQuestionTask;
