const TrueFalseNotGivenQuestion = ({ id, statement }) => (
  <div className="true-false-not-given-question">
    <p>{statement}</p>
    <div>
      <input type="radio" id={`yes-${id}`} name={`tfng-${id}`} value="YES" />
      <label htmlFor={`yes-${id}`}>YES</label>
    </div>
    <div>
      <input type="radio" id={`no-${id}`} name={`tfng-${id}`} value="NO" />
      <label htmlFor={`no-${id}`}>NO</label>
    </div>
    <div>
      <input type="radio" id={`not-given-${id}`} name={`tfng-${id}`} value="NOT GIVEN" />
      <label htmlFor={`not-given-${id}`}>NOT GIVEN</label>
    </div>
  </div>
);

export default TrueFalseNotGivenQuestion;