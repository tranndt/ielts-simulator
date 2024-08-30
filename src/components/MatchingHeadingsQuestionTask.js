import React from "react";
import MatchingHeadingsQuestion from "./MatchingHeadingsQuestion";
import HeadingsTable from "./HeadingsTable";
import './QuestionStyles.css';
import QuestionTaskDescription from "./QuestionTaskDescription";

function MatchingHeadingsQuestionTask({ questionTask }) {
    return (
        <div className="matching-headings-question-task">
            <QuestionTaskDescription taskDescription={questionTask.taskDescription}/>
            <HeadingsTable data={questionTask.headingsList}/>
            <div>{questionTask.exampleAnswer}</div>
            {questionTask.questions.map((question, index) => (
                <MatchingHeadingsQuestion key={index} id={index} {...question}/>
            ))}
        </div>
    );
}

export default MatchingHeadingsQuestionTask;
