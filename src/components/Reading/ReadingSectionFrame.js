import React from 'react';
import PassageFrame from './PassageFrame';
import QuestionFrame from '../Reading/QuestionFrame';
import SectionInfoFrame from './SectionInfoFrame';
import './ReadingStyles.css';
import GradingComponent from '../Grading/GradingComponent';

const ReadingSectionFrame = ({ passage }) => (
  <div className="passage-page">
    <SectionInfoFrame taskTitle={passage.taskTitle} taskSubtitle={passage.taskSubtitle} />
    <PassageFrame 
      passageContext={passage.passageContext}
      passageTitle={passage.passageTitle} 
      passageSubtitle={passage.passageSubtitle} 
      passageText={passage.passageText} 
    />
    <QuestionFrame questionsList={passage.questionsList} />
  </div>
);

export default ReadingSectionFrame;