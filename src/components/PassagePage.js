import React from 'react';
import TextPassage from './TextPassage';
import QuestionsList from './QuestionsList';
import './PassagePage.css';

const PassagePage = ({ passage }) => (
  <div className="passage-page">
    <TextPassage taskTitle = {passage.taskTitle} taskSubtitle={passage.taskSubtitle} passageTitle={passage.passageTitle} 
    passageSubtitle = {passage.passageSubtitle} passageText={passage.passageText} />
    <QuestionsList questionsList={passage.questionsList} />
  </div>
);

export default PassagePage;