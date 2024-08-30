import './PassageFrame.css';

function convertNewlinesToDoubleSpace(text) {
  return text.replace(/\n/g, '\n\n');
}

const PassageFrame = ({ taskTitle, taskSubtitle, passageTitle, passageSubtitle, passageText }) => (

  <div className="passage-frame">
    <h1 class="task-title">{taskTitle}</h1>
    <p class="task-subtitle">{convertNewlinesToDoubleSpace(taskSubtitle)}</p>
    <h2 class="passage-title">{passageTitle}</h2>
    <h3 class="passage-subtitle">{passageSubtitle}</h3>
    <p class="passage-text">{convertNewlinesToDoubleSpace(passageText)}</p>
  </div>
);

export default PassageFrame;
export { convertNewlinesToDoubleSpace };