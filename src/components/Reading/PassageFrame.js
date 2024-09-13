import React, { useState } from 'react';
import './ReadingStyles.css';

function convertNewlinesToDoubleSpace(text) {
  return text.replace(/\n/g, '\n\n');
}

const PassageFrame = ({ passageContent}) => {
  const { hasParagraphMarkers, passageContext, passageTitle, passageSubtitle, passageMainText, passageParagraphs } = passageContent;
  const [highlightedText, setHighlightedText] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    const selection = window.getSelection().toString();
    if (selection) {
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        text: selection,
      });
    }
  };

  const handleHighlight = () => {
    setHighlightedText([...highlightedText, contextMenu.text]);
    setContextMenu(null);
  };

  const handleUndoHighlight = () => {
    const newHighlightedText = highlightedText.filter(text => !contextMenu.text.includes(text));
    setHighlightedText(newHighlightedText);
    setContextMenu(null);
  };

  const renderTextWithHighlights = (text) => {
    let parts = text.split(new RegExp(`(${highlightedText.join('|')})`, 'g'));
    return parts.map((part, index) => 
      highlightedText.includes(part) ? <mark key={index}>{part}</mark> : part
    );
  };

  //    <p className="passage-text">{renderTextWithHighlights(passageMainText)}</p> # Example of how to use renderTextWithHighlights
  return (
    <div className="passage-frame" onContextMenu={handleContextMenu}>
      <p className="passage-context">{renderTextWithHighlights(passageContext)}</p>
      {passageTitle && <h2 className="passage-title">{passageTitle}</h2>}
      {passageSubtitle && <h3 className="passage-subtitle">{passageSubtitle}</h3>}
      <div>
      {passageParagraphs.map((paragraph, index) => (
        hasParagraphMarkers ? 
          <><p><b>{renderTextWithHighlights(paragraph[0])}</b></p>
          <p key={index} className="passage-text">{renderTextWithHighlights(paragraph[1])}</p></>
          :
          <p key={index} className="passage-text">{renderTextWithHighlights(paragraph)}</p>
      ))}
      </div>

      {contextMenu && (
        <div 
          className="context-menu" 
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button onClick={handleHighlight}>Highlight</button>
          <button onClick={handleUndoHighlight}>Undo Highlight</button>
        </div>
      )}
    </div>
  );
};

export default PassageFrame;
export { convertNewlinesToDoubleSpace };