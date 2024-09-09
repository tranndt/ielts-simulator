import React from "react";
import './QuestionStyles.css';


function MatchingHeadingsQuestionItem({ id, questionItem, onAnswerChange, submitted }) {
  const handleChange = (event) => {
    onAnswerChange(questionItem.questionNumber, event.target.value);
  };

  return (
    <div className="matching-headings-question question-item" style={{ display: 'flex', alignItems: 'center' }}>
      {/* Question Text */}
      <div className="question-text" style={{ flex: 1 }}>
        <span>{questionItem.questionNumber}. {questionItem.questionText}</span>
      </div>

      {/* Dropdown for Answer Selection */}
      <div style={{ flex: 1 }}>
        <select
          name={`heading-${questionItem.questionNumber}`}
          id={`heading-${questionItem.questionNumber}`}
          onChange={handleChange}
          disabled={submitted}
        >
          {questionItem.questionOptions.map((heading, index) => (
            <option key={index} value={heading[0]}>
              {heading[0]}
            </option>
          ))}
        </select>
      </div>

      {/* Correct Answer Div (hidden until submitted) */}
      {submitted && (
        <div
          className="correct-answer"
          style={{
            marginLeft: '10px',
            padding: '5px',
            backgroundColor: '#d4edda',
            borderRadius: '4px',
            display: submitted ? 'block' : 'none'
          }}
        >
          {questionItem.correctAnswer[0]} {/* Correct Answer */}
        </div>
      )}
    </div>
  );
}

export default MatchingHeadingsQuestionItem;


  