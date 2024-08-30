import React from 'react';
import PassageFrame from './PassageFrame';
import QuestionsFrame from './QuestionsFrame';
import './PassagePage.css';

const PassagePage = ({ passage }) => (
  <div className="passage-page">
    <div className="text-passage-container">
      <PassageFrame 
        taskTitle={passage.taskTitle} 
        taskSubtitle={passage.taskSubtitle} 
        passageTitle={passage.passageTitle} 
        passageSubtitle={passage.passageSubtitle} 
        passageText={passage.passageText} 
      />
    </div>
    <div className="questions-list-container">
      <QuestionsFrame questionsList={passage.questionsList} />
    </div>
  </div>
);

export default PassagePage;