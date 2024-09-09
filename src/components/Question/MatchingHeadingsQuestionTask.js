import React, { useState,useEffect} from 'react';
import MatchingHeadingsQuestionItem from "./MatchingHeadingsQuestionItem";
import ListOfHeadingsTable from "../Table/ListOfHeadingsTable";
import QuestionTaskDescription from "./QuestionTaskDescription";
import './QuestionStyles.css';


function MatchingHeadingsQuestionTask({ questionTask, onTaskGrading, submitted }) {
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
      if (userAnswer && userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    setCorrectCount(correctAnswers);
    onTaskGrading(correctAnswers, questionTask.questions.length); // Send correct and total questions
  };

  return (
    <div className="matching-headings-question-task">
      <QuestionTaskDescription taskDescription={questionTask.taskDescription} />
      <ListOfHeadingsTable data={questionTask.headingsList} />
      <div>{questionTask.exampleAnswer}</div>
      {questionTask.questions.map((questionItem, index) => (
        <MatchingHeadingsQuestionItem
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

export default MatchingHeadingsQuestionTask;

