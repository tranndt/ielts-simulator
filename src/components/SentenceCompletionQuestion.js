const SentenceCompletionQuestion = ({ question, options }) => (
    <div className="sentence-completion-question">
      <p>{question}</p>
      <select>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  
export default SentenceCompletionQuestion;