import React, { useState } from 'react';
import MatchingHeadingsQuestionItem from "./MatchingHeadingsQuestionItem";
import ListOfHeadingsTable from "../Table/ListOfHeadingsTable";
import './QuestionStyles.css';
import QuestionTaskDescription from "./QuestionTaskDescription";

function MatchingHeadingsQuestionTask({ questionTask }) {
    const [userAnswers, setUserAnswers] = useState({});
    const handleAnswerChange = (questionNumber, answer) => {
        setUserAnswers({
          ...userAnswers,
          [questionNumber]: answer,
        });
        console.log(userAnswers)
      };
    return (
        <div className="matching-headings-question-task">
            <QuestionTaskDescription taskDescription={questionTask.taskDescription}/>
            <ListOfHeadingsTable data={questionTask.headingsList}/>
            <div>{questionTask.exampleAnswer}</div>
            {questionTask.questions.map((question, index) => (
                <MatchingHeadingsQuestionItem key={index} id={index} {...question} onAnswerChange={handleAnswerChange}/>
            ))}
        </div>
    );
}

export default MatchingHeadingsQuestionTask;
