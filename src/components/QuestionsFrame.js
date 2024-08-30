import React from "react";
import SentenceCompletionQuestion from "./SentenceCompletionQuestion";
import TrueFalseNotGivenQuestion from "./TrueFalseNotGivenQuestion";
import MultipleChoiceQuestionTask from "./MultipleChoiceQuestionTask";
import TableCompletionQuestionTask from "./TableCompletionQuestionTask";
import MatchingHeadingsQuestionTask from "./MatchingHeadingsQuestionTask";
import './QuestionsFrame.css';

function QuestionsFrame({ questionsList }) {
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

  
export default QuestionsFrame;