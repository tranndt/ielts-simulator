import React from "react";

function MultipleChoiceQuestion({ questionNumber, questionText, questionOptions, correctAnswer }) {
    console.log(questionNumber, questionText, questionOptions, correctAnswer);

    return (
        <div className="multiple-choice-question">
            <div className="question-text">{questionText}</div>
            {questionOptions.map((option, index) => (
                <div key={index}>
                    <input type="radio" id={`option-${questionNumber}-${index}`} name={`mcq-${questionNumber}`} value={option} />
                    <label htmlFor={`option-${questionNumber}-${index}`}>{option[0]}. {option[1]}</label>
                </div>
            ))}
        </div>
    );
}

export default MultipleChoiceQuestion;