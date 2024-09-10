import React, { useEffect, useState } from "react";
import MultipleChoiceQuestionTask from "../Question/MultipleChoiceQuestionTask";
import TableCompletionQuestionTask from "../Question/TableCompletionQuestionTask";
import NoteCompletionQuestionTask from "../Question/NoteCompletionQuestionTask";
import SentenceCompletionQuestionTask from "../Question/SentenceCompletionQuestionTask";
import SummaryCompletionQuestionTask from "../Question/SummaryCompletionQuestionTask";
import SummaryCompletionWordListQuestionTask from "../Question/SummaryCompletionWordListQuestionTask";
import DiagramCompletionQuestionTask from "../Question/DiagramCompletionQuestionTask";
import FlowChartCompletionQuestionTask from "../Question/FlowChartCompletionQuestionTask";
import MatchingHeadingsQuestionTask from "../Question/MatchingHeadingsQuestionTask";
import MatchingFeaturesQuestionTask from "../Question/MatchingFeaturesQuestionTask";
import MatchingSentenceEndingsQuestionTask from "../Question/MatchingSentenceEndingsQuestionTask";
import '../Question/QuestionStyles.css';

function QuestionFrame({ questionsList }) {
  const [totalQuestions, setTotalQuestions] = useState(0); // Collect total number of questions at the start
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    // Calculate the total number of questions across all tasks when the component mounts
    const total = questionsList.reduce((acc, questionTask) => {
      return acc + questionTask.questions.length;
    }, 0);
    setTotalQuestions(total);
    // Reset grading and answers visibility
    setTotalCorrect(0);
    setShowAnswers(false);
  }, [questionsList]); // Only run when questionsList changes

  const handleTaskGrading = (isCorrect) => {
    // Update the total correct answers when a question task returns a correct answer
    setTotalCorrect((prevCorrect) => prevCorrect + (isCorrect ? 1 : 0));
  };

  const toggleShowAnswers = () => {
    setShowAnswers((prevShowAnswers) => !prevShowAnswers);
    if (!showAnswers) {
      setTotalCorrect(0);  // Reset correct answers when hiding answers
    }
  };

  return (
    <div className="question-frame">
      {questionsList.map((questionTask, index) => {
        switch (questionTask.questionType) {
          case "multiple_choice_select_one":
            return (
              <MultipleChoiceQuestionTask
                key={index}
                id={index}
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
                showAnswers={showAnswers}
              />
            );
          case "matching_headings":
            return (
              <MatchingHeadingsQuestionTask
                key={index}
                id={index}
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
                showAnswers={showAnswers}
              />
            );
          case "matching_features":
            return (
              <MatchingFeaturesQuestionTask
                key={index}
                id={index}
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
                showAnswers={showAnswers}
              />
            );
            case "matching_sentence_endings":
            return (
              <MatchingSentenceEndingsQuestionTask
                key={index}
                id={index}
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
                showAnswers={showAnswers}
              />
            );
          case "table_completion":
            return (
              <TableCompletionQuestionTask
                key={index}
                id={index}
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
                showAnswers={showAnswers}
              />
            );
          case "note_completion":
            return (
              <NoteCompletionQuestionTask
                key={index}
                id={index}
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
                showAnswers={showAnswers}
              />
            );
          case "sentence_completion":
            return (
              <SentenceCompletionQuestionTask
                key={index}
                id={index}
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
                showAnswers={showAnswers}
              />
            );
          case "summary_completion":
            return (
              <SummaryCompletionQuestionTask
                key={index}
                id={index}
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
                showAnswers={showAnswers}
              />
            );
            case "summary_completion_word_list":
            return (
              <SummaryCompletionWordListQuestionTask
                key={index}
                id={index}
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
                showAnswers={showAnswers}
              />
            );
            case "diagram_completion":
            return (
              <DiagramCompletionQuestionTask
                key={index}
                id={index}
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
                showAnswers={showAnswers}
              />
            );
            case "flow_chart_completion":
            return (
              <FlowChartCompletionQuestionTask
                key={index}
                id={index}
                questionTask={questionTask}
                onTaskGrading={handleTaskGrading}
                showAnswers={showAnswers}
              />
            );
          
          default:
            return null;
        }
      })}

      <button id="show-answers-btn" onClick={toggleShowAnswers}>
        {showAnswers ? "Hide Answers" : "Show Answers"}
      </button>

      {showAnswers && (
        <div id="correct-answers-count">
          You Scored: {totalCorrect} / {totalQuestions}
        </div>
      )}
    </div>
  );
}

export default QuestionFrame;
