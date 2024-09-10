import React, {useState, useEffect} from "react";
import './QuestionStyles.css';

function SummaryCompletionWordListQuestionItem({ questionItem, onItemGrading, showAnswers }) {
  const [userAnswer, setUserAnswer] = useState(null);

  const handleChange = (event) => {
    setUserAnswer(event.target.value);
  };

  useEffect(() => {
    if (showAnswers && userAnswer !== null) {
      const isCorrect = userAnswer === questionItem.correctAnswer[0];
      onItemGrading(isCorrect);
    }
  }, [showAnswers, userAnswer]);

  return (
    <div className="summmary-completion-word-list-question-item question-item">
      <table>
        <tbody>
          <tr>
            <td>
              <span className="fixed-width">{questionItem.questionNumber}.</span>
            </td>
            <td>
              <select
                name={`heading-${questionItem.questionNumber}`}
                id={`heading-${questionItem.questionNumber}`}
                onChange={handleChange}
                disabled={showAnswers}
              >
                <option value=""></option>
                {questionItem.questionOptions.map((heading, index) => (
                  <option key={index} value={heading[0]}>
                    {heading[0] + " - " + heading[1]}
                  </option>
                ))}
              </select>
            </td>
            {showAnswers && (
              <td
                className={(userAnswer === questionItem.correctAnswer[0]) ? "correct-answer" : "correct-answer-non-matching"}>
                {questionItem.correctAnswer[0] + " - " + questionItem.correctAnswer[1]}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SummaryCompletionWordListQuestionItem;
