import React from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";


function MultipleChoiceQuestionTask({ questionTask }) {
    console.log(questionTask);

    return (
        <div className="multiple-choice-question-task">
            <div className="question-text">{questionTask.taskDescription}</div>
            {questionTask.questions.map((question, index) => (
                <MultipleChoiceQuestion key={index} id={index} {...question}/>
            ))}
        </div>
    );
}

export default MultipleChoiceQuestionTask;