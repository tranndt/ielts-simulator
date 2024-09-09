import React from 'react';
import PassageFrame from './PassageFrame';
import QuestionFrame from '../Reading/QuestionFrame';
import SectionInfoFrame from './SectionInfoFrame';
import TimerFrame from './TimerFrame';
import './ReadingStyles.css';

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
    <TimerFrame taskTime = {passage.taskTime}/>
  </div>
);

export default ReadingSectionFrame;