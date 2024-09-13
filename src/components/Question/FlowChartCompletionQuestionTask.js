import React, { useState, useEffect } from 'react';
import FlowChartCompletionQuestionItem from './FlowChartCompletionQuestionItem';
import DataTable from '../Table/DataTable';
import QuestionTaskDescription from './QuestionTaskDescription';
import './QuestionStyles.css';

function FlowChartCompletionQuestionTask({ id, questionTask, onTaskGrading, showAnswers }) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [imageSrc, setImageSrc] = useState(questionTask.questionImgPath);
  const [loading, setLoading] = useState(true);

  const handleItemGrading = (isCorrect) => {
    // Increment or decrement based on whether the answer is correct or incorrect
    setCorrectAnswers((prevCorrect) => prevCorrect + (isCorrect ? 1 : 0));
    onTaskGrading(isCorrect);  // Notify parent of each individual grading event
  };

  useEffect(() => {
    if (!showAnswers) {
      setCorrectAnswers(0);  // Reset correct answers when hiding answers
    }
  }, [showAnswers]);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(questionTask.questionImgPath);
        setImageSrc(image.default);
      } catch (error) {
        console.error('Error loading image:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [questionTask]);

  return (
    <div className="flow-chart-completion-question-task">
      <h3>{questionTask.taskQuestionNumberText}</h3>
      <QuestionTaskDescription taskDescription={questionTask.taskDescription} />
      <h3 style={{ textAlign: 'center' }}>{questionTask.questionMainTitle}</h3>

      <div className="question-img">
        {loading ? (
          <p>Loading image...</p>
        ) : (
          <img src={imageSrc} style={{ maxWidth: '95%'}} alt="Flow Chart" />
        )}
      </div>

      <div className='your-answers-text'>Your Answers:</div>
      {questionTask.questionItems.map((questionItem, index) => (
        <FlowChartCompletionQuestionItem
          key={index}
          id={index}
          questionItem={questionItem}
          onItemGrading={handleItemGrading}
          showAnswers={showAnswers}
        />
      ))}
    </div>
  );
}

export default FlowChartCompletionQuestionTask;