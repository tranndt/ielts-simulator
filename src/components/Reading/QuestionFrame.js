import React, { useState, useEffect } from "react";
import MultipleChoiceQuestionTask from "../Question/MultipleChoiceQuestionTask";
import TableCompletionQuestionTask from "../Question/TableCompletionQuestionTask";
import MatchingHeadingsQuestionTask from "../Question/MatchingHeadingsQuestionTask";
import '../Question/QuestionStyles.css';

function QuestionFrame({ questionsList }) {
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleTaskGrading = (correctCount) => {
    setTotalCorrect(prevCorrect => prevCorrect + correctCount);
  };

  const toggleShowAnswers = () => {
    if (submitted) {
      // Reset correct answer count when hiding answers
      setTotalCorrect(0);
    }
    setSubmitted(prevSubmitted => !prevSubmitted); // Toggle show/hide answers
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
                submitted={submitted}
              />
            );
          // Add other question types here as needed
          default:
            return null;
        }
      })}
      <button id="show-answers-btn" onClick={toggleShowAnswers}>
        {submitted ? 'Hide Answers' : 'Show Answers'}
      </button>
      {submitted && <div id="correct-answers-count">Correct answers: {totalCorrect}</div>}
    </div>
  );
}

export default QuestionFrame;


