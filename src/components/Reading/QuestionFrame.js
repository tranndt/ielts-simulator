import React, { useState, useEffect } from "react";
import MultipleChoiceQuestionTask from "../Question/MultipleChoiceQuestionTask";
import TableCompletionQuestionTask from "../Question/TableCompletionQuestionTask";
import MatchingHeadingsQuestionTask from "../Question/MatchingHeadingsQuestionTask";
import '../Question/QuestionStyles.css';


function QuestionFrame({ questionsList }) {
  const [totalCorrect, setTotalCorrect] = useState(0);

  const handleTaskGrading = (correctCount) => {
    setTotalCorrect(prevCorrect => prevCorrect + correctCount);
  };

  const handleSubmit = () => {
    console.log(`Total correct answers: ${totalCorrect}`);
    alert(`You answered ${totalCorrect} correctly.`);
  };

  return (
    <div className="questions-list">
      {questionsList.map((questionTask, index) => {
        switch (questionTask.questionType) {
          case "multiple_choice":
            return (
              <MultipleChoiceQuestionTask 
                key={index} 
                id={index} 
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
              />
            );
          case "table_completion":
            return (
              <TableCompletionQuestionTask 
                key={index} 
                id={index} 
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
              />
            );
          case "matching_headings":
            return (
              <MatchingHeadingsQuestionTask 
                key={index} 
                id={index} 
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
              />
            );
          default:
            return null;
        }
      })}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default QuestionFrame;
