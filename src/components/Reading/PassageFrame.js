import React, { useState } from 'react';
import './ReadingStyles.css';

function convertNewlinesToDoubleSpace(text) {
  return text.replace(/\n/g, '\n\n');
}

const PassageFrame = ({ passageContext, passageTitle, passageSubtitle, passageText }) => {
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

  return (
    <div className="passage-frame" onContextMenu={handleContextMenu}>
      <p className="passage-context">{renderTextWithHighlights(convertNewlinesToDoubleSpace(passageContext))}</p>
      <h2 className="passage-title">{passageTitle}</h2>
      <h3 className="passage-subtitle">{passageSubtitle}</h3>
      <p className="passage-text">{renderTextWithHighlights(convertNewlinesToDoubleSpace(passageText))}</p>
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