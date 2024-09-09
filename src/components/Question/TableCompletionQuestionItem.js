import './QuestionStyles.css';

import React from 'react';

function TableCompletionQuestionItem({ questionItem, onAnswerChange, submitted }) {
  const handleChange = (event) => {
    onAnswerChange(questionItem.questionNumber, event.target.value);
  };

  return (
    <div className="table-completion-question question-item" style={{ display: 'flex', alignItems: 'center' }}>
      {/* Input Box */}
      <div style={{ flex: 1 }}>
        <input
          type="text"
          id={`option-${questionItem.questionNumber}`}
          name={`table-${questionItem.questionNumber}`}
          onChange={handleChange}
          disabled={submitted}
        />
      </div>

      {/* Correct Answer Div (hidden until submitted)n  */}
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
          {questionItem.correctAnswer}
        </div>
      )}
    </div>
  );
}

export default TableCompletionQuestionItem;
