import TableCompletionQuestionItem from "./TableCompletionQuestionItem";
import DataTable from "../Table/DataTable";
import QuestionTaskDescription from "./QuestionTaskDescription";
import './QuestionStyles.css';
import React, { useState, useEffect } from 'react';


function TableCompletionQuestionTask({ questionTask, onTaskGrading, submitted }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (submitted) {
      gradeTask();
    }
  }, [submitted]);

  const handleAnswerChange = (questionNumber, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionNumber]: answer,
    });
  };

  const gradeTask = () => {
    let correctAnswers = 0;

    questionTask.questions.forEach((question, index) => {
      const userAnswer = userAnswers[question.questionNumber];
      if (userAnswer && userAnswer.toLowerCase() === question.correctAnswer.toLowerCase()) {
        correctAnswers++;
      }
    });

    setCorrectCount(correctAnswers);
    onTaskGrading(correctAnswers, questionTask.questions.length); // Send correct and total questions
  };

  return (
    <div className="table-completion-question-task">
      <QuestionTaskDescription taskDescription={questionTask.taskDescription} />
      <DataTable data={questionTask.questionContent} />
      <b>Your Answers:</b>
      {questionTask.questions.map((questionItem, index) => (
        <TableCompletionQuestionItem
          key={index}
          id={index}
          questionItem = {questionItem}
          onAnswerChange={handleAnswerChange}
          submitted={submitted}
        />
      ))}
    </div>
  );
}

export default TableCompletionQuestionTask;
