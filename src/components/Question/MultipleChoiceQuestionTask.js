import React from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestionItem";
import QuestionTaskDescription from "./QuestionTaskDescription";
import './QuestionStyles.css';


function MultipleChoiceQuestionTask({ questionTask }) {
    console.log(questionTask);

    return (
        <div className="multiple-choice-question-task">
            <QuestionTaskDescription taskDescription={questionTask.taskDescription}/>
            {questionTask.questions.map((question, index) => (
                <MultipleChoiceQuestion key={index} id={index} {...question}/>
            ))}
        </div>
    );
}

export default MultipleChoiceQuestionTask;