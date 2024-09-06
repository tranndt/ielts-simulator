import React from 'react';
import PassageFrame from './PassageFrame';
import QuestionFrame from '../Reading/QuestionFrame';
import SectionInfoFrame from './SectionInfoFrame';
import './ReadingStyles.css';
import GradingComponent from '../Grading/GradingComponent';

const ReadingSectionFrame = ({ passage }) => (
  <div className="passage-page">
    <div className="section-info-frame">
      <SectionInfoFrame taskTitle={passage.taskTitle} taskSubtitle={passage.taskSubtitle} />
    </div>
    <div className="text-passage-container">
      <PassageFrame 
        passageContext={passage.passageContext}
        passageTitle={passage.passageTitle} 
        passageSubtitle={passage.passageSubtitle} 
        passageText={passage.passageText} 
      />
    </div>
    <div className="questions-list-container">
      <QuestionFrame questionsList={passage.questionsList} />
    </div>
  </div>
);

export default ReadingSectionFrame;