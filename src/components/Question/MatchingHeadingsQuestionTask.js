import React from "react";
import MatchingHeadingsQuestionItem from "./MatchingHeadingsQuestionItem";
import ListOfHeadingsTable from "../Table/ListOfHeadingsTable";
import './QuestionStyles.css';
import QuestionTaskDescription from "./QuestionTaskDescription";

function MatchingHeadingsQuestionTask({ questionTask }) {
    return (
        <div className="matching-headings-question-task">
            <QuestionTaskDescription taskDescription={questionTask.taskDescription}/>
            <ListOfHeadingsTable data={questionTask.headingsList}/>
            <div>{questionTask.exampleAnswer}</div>
            {questionTask.questions.map((question, index) => (
                <MatchingHeadingsQuestionItem key={index} id={index} {...question}/>
            ))}
        </div>
    );
}

export default MatchingHeadingsQuestionTask;
