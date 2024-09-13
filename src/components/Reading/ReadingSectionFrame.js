import React from 'react';
import PassageFrame from './PassageFrame';
import QuestionFrame from '../Reading/QuestionFrame';
import SectionInfoFrame from './SectionInfoFrame';
import TimerFrame from './TimerFrame';
import './ReadingStyles.css';

const ReadingSectionFrame = ({ passage }) => (
  <div className="passage-page">
    <SectionInfoFrame readingInfo={passage.readingInfo} />
    <PassageFrame 
      passageContent = {passage.passageContent}
    />
    <QuestionFrame questionsList={passage.questionContent} />
    <TimerFrame/>
  </div>
);

export default ReadingSectionFrame;