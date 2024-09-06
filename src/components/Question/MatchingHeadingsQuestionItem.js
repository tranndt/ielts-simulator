import React from "react";
import './QuestionStyles.css';

function MatchingHeadingsQuestionItem({ questionNumber, questionText, questionOptions, correctAnswer, onAnswerChange }) {
    const handleChange = (event) => {
        onAnswerChange(questionNumber, event.target.value);
    };

    return (
        <div className="matching-headings-question question-item">
            <div className="question-text">
                <span>{questionNumber}. {questionText}</span>
            </div>
            <select name={`heading-${questionNumber}`} id={`heading-${questionNumber}`} onChange={handleChange}>
                {questionOptions.map((heading, index) => (
                    <option key={index} value={heading[0]}> 
                        {heading[0]}
                    </option>
                ))}
            </select> 
        </div>
    );
}

export default MatchingHeadingsQuestionItem;