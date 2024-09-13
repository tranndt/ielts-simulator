import React, {useState, useEffect} from "react";
import './QuestionStyles.css';


function MatchingParagraphsQuestionItem({ id, questionItem, onItemGrading, showAnswers }) {
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
    <tr className="matching-headings-question-item question-item"
    style={{display:'flex', flexDirection:'row'}}>
      <td style={{width:'5em', textAlign:'center'}}>
        {questionItem.questionNumber}
      </td>
      <td style={{width:'25em'}}>
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
          className={(userAnswer === questionItem.correctAnswer) ? "correct-answer" : "correct-answer-non-matching"}>
          {questionItem.correctAnswer}
        </td>
      )}
    </tr>
  );
}

export default MatchingParagraphsQuestionItem;


  