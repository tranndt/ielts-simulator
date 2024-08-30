import React from "react";
import './QuestionStyles.css';
import './MatchingHeadingsQuestion.css';

function MatchingHeadingsQuestion({ questionNumber, questionText, questionOptions, correctAnswer }) {
    console.log(questionNumber, questionText, questionOptions, correctAnswer)
    return (
        <div className="matching-headings-question question-item">
            <div className="question-text">
                <span>{questionNumber}. {questionText}</span>
            </div>
            <select name={`heading-${questionNumber}`} id={`heading-${questionNumber}`}>
                {questionOptions.map((heading, index) => (
                    <option key={index} value={heading[0]}>
                        {heading[0]}
                    </option>
                ))}
            </select> 
        </div>
    );
}

export default MatchingHeadingsQuestion;
