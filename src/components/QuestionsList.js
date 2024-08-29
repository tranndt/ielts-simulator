import React from "react";
import SentenceCompletionQuestion from "./SentenceCompletionQuestion";
import TrueFalseNotGivenQuestion from "./TrueFalseNotGivenQuestion";
import MultipleChoiceQuestionTask from "./MultipleChoiceQuestionTask";

function QuestionsList({ questionsList }) {
  return (
    <div className="questions-list">
      {questionsList.map((question, index) => {
        console.log(question);
        switch (question.questionType) {
          case "multiple_choice":
            console.log(question);
            return <MultipleChoiceQuestionTask key={index} id={index} questionTask={question}/>;
          case "sentence_completion":
            return <SentenceCompletionQuestion key={index} {...question} />;
          case "true_false_not_given":
            return <TrueFalseNotGivenQuestion key={index} id={index} {...question} />;
          default:
            return null;
        }
      })}
    </div>
  );
} 

  
export default QuestionsList;