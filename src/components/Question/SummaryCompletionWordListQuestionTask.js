import React, { useState, useEffect } from "react";
import SummaryCompletionWordListQuestionItem from "./SummaryCompletionWordListQuestionItem";
import DataTable from "../Table/DataTable";
import QuestionTaskDescription from "./QuestionTaskDescription";
import ListOfHeadingsTable from "../Table/ListOfHeadingsTable";
import './QuestionStyles.css';

function SummaryCompletionWordListQuestionTask({ id, questionTask, onTaskGrading, showAnswers }) {
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
    <div className="summmary-completion-word-list-question-task">
      <h3>{questionTask.taskQuestionNumberText}</h3>
      <QuestionTaskDescription taskDescription={questionTask.taskDescription} />
      <h3 style={{textAlign:'center'}}>{questionTask.questionMainTitle}</h3>
      {/* {questionTask.questionMainText.map((content, index) => (
        <p>{content}</p>
      ))} */}
      <p>{questionTask.questionMainText}</p>
      <ListOfHeadingsTable tableTitle = {questionTask.questionListTitle} tableData={questionTask.questionListOptions} />
      {questionTask.exampleAnswer &&
        <p><b>{questionTask.exampleAnswer}</b></p>
      }
      <div class='your-answers-text'>Your Answers:</div>
      <table>
        <tbody>
          {questionTask.questionItems.map((questionItem, index) => (
            <SummaryCompletionWordListQuestionItem
              key={index}
              id={index}
              questionItem = {questionItem}
              onItemGrading={handleItemGrading}
              showAnswers={showAnswers}
            />
          ))}
        </tbody>
      </table>
      {showAnswers && (
        <div className="task-score">
          Task Score: {correctAnswers} / {questionTask.questionItems.length}
        </div>
      )}
    </div>
  );
}

export default SummaryCompletionWordListQuestionTask;
