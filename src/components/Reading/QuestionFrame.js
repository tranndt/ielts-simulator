import React from "react";
import MultipleChoiceQuestionTask from "../Question/MultipleChoiceQuestionTask";
import TableCompletionQuestionTask from "../Question/TableCompletionQuestionTask";
import MatchingHeadingsQuestionTask from "../Question/MatchingHeadingsQuestionTask";
import '../Question/QuestionStyles.css';

function QuestionFrame({ questionsList }) {
  return (
    <div className="questions-list">
      {questionsList.map((questionTask, index) => {
        console.log(questionTask);
        switch (questionTask.questionType) {
          case "multiple_choice":
            return <MultipleChoiceQuestionTask key={index} id={index} questionTask={questionTask}/>;
          case "table_completion":
            return <TableCompletionQuestionTask key={index} id={index} questionTask={questionTask} />;
          case "matching_headings":
            return <MatchingHeadingsQuestionTask key={index} id={index} questionTask={questionTask} />;
          default:
            return null;
        }
      })}
    </div>
  );
} 

  
export default QuestionFrame;