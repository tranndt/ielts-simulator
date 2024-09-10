import React, {useState, useEffect} from "react";
import './QuestionStyles.css';

function DiagramCompletionQuestionItem({ questionItem, onItemGrading, showAnswers }) {
  const [userAnswer, setUserAnswer] = useState(null);

  const handleChange = (event) => {
    setUserAnswer(event.target.value);
  };

  useEffect(() => {
    if (showAnswers && userAnswer !== null) {
      const isCorrect = userAnswer === questionItem.correctAnswer;
      onItemGrading(isCorrect);
    }
  }, [showAnswers, userAnswer]);

  return (
    <div className="diagram-completion-question-item question-item">
      <table>
        <tbody>
          <tr>
            <td>
              <span className="fixed-width">{questionItem.questionNumber}.</span>
            </td>
            <td>
              <input
                type="text"
                id={`option-${questionItem.questionNumber}`}
                name={`table-${questionItem.questionNumber}`}
                onChange={handleChange}
                disabled={showAnswers} // Disable input when answers are shown
                autoComplete="off" // Disable auto-fill
              />
            </td>
            {showAnswers && (
              <td
                className={(userAnswer === questionItem.correctAnswer) ? "correct-answer" : "correct-answer-non-matching"}>
                {questionItem.correctAnswer}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DiagramCompletionQuestionItem;
