import React, {useState, useEffect} from "react";
import './QuestionStyles.css';


function MatchingSentenceEndingsQuestionItem({ id, questionItem, onItemGrading, showAnswers }) {
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
    <div className="matching-sentence-endings-question-item question-item">
    <table>
      <tbody >
        <tr >
          <td style={{width:'5em', textAlign:'center'}}>
            {questionItem.questionNumber}
          </td>
          <td style={{maxWidth:'30em'}}>
            {questionItem.questionText}
          </td>
          <td style={{width:'5em', textAlign:'center'}}>
            <select
              name={`heading-${questionItem.questionNumber}`}
              id={`heading-${questionItem.questionNumber}`}
              onChange={handleChange}
              disabled={showAnswers}
            >
              <option value=""></option>
              {questionItem.questionOptions.map((heading, index) => (
                <option key={index} value={heading[0]}>
                  {heading[0]}
                </option>
              ))}
            </select>
          </td>
          {showAnswers && (
            <td
              className={(userAnswer === questionItem.correctAnswer[0]) ? "correct-answer" : "correct-answer-non-matching"}>
              {questionItem.correctAnswer[0]}
            </td>
          )}
        </tr>
      </tbody>
    </table>
  </div>
  );
}

export default MatchingSentenceEndingsQuestionItem;


  