const TextPassage = ({ taskTitle, taskSubtitle, passageTitle, passageSubtitle, passageText }) => (

    <div className="text-passage">
      <h1>{taskTitle}</h1>
      <p>{taskSubtitle}</p>
      <h2>{passageTitle}</h2>
      <h3>{passageSubtitle}</h3>
      <p>{passageText}</p>
    </div>
  );

export default TextPassage;