import './ReadingStyles.css';

function convertNewlinesToDoubleSpace(text) {
  return text.replace(/\n/g, '\n\n');
}

const PassageFrame = ({ passageContext, passageTitle, passageSubtitle, passageText }) => (

  <div className="passage-frame">
    <p class="passage-context">{convertNewlinesToDoubleSpace(passageContext)}</p>
    <h2 class="passage-title">{passageTitle}</h2>
    <h3 class="passage-subtitle">{passageSubtitle}</h3>
    <p class="passage-text">{convertNewlinesToDoubleSpace(passageText)}</p>
  </div>
);

export default PassageFrame;
export { convertNewlinesToDoubleSpace };