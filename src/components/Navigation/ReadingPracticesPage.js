
import React from 'react';
import { Link } from 'react-router-dom';
import './ReadingPracticesPage.css';

const ReadingPracticesPage = () => (
  <div className="reading-practices-page">
    <div className="jumbotron">
      <h1 className="display-4">Reading Practices</h1>
      <p>Practice different types of reading questions to improve your skills.</p>
    </div>
    <table className="practices-table">
      <thead>
        <tr>
          <th>Question Type</th>
          <th>Task Description</th>
          <th>Recommended Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Link to="/ielts-simulator/reading-practices/multiple-choice-select-one">Multiple Choice</Link></td>
          <td>Select the correct answer from a list of options.</td>
          <td>10 minutes</td>
        </tr>
        <tr>
          <td><Link to="/ielts-simulator/reading-practices/table-completion">Table Completion</Link></td>
          <td>Fill in the blanks in a table based on the passage.</td>
          <td>10 minutes</td>
        </tr>
        <tr>
          <td><Link to="/ielts-simulator/reading-practices/note-completion">Note Completion</Link></td>
          <td>Fill in the blanks in notes based on the passage.</td>
          <td>10 minutes</td>
        </tr>
        <tr>
          <td><Link to="/ielts-simulator/reading-practices/sentence-completion">Sentence Completion</Link></td>
          <td>Fill in the blanks in sentences based on the passage.</td>
          <td>10 minutes</td>
        </tr>
        <tr>
          <td><Link to="/ielts-simulator/reading-practices/summary-completion">Summary Completion</Link></td>
          <td>Fill in the blanks in a summary based on the passage.</td>
          <td>10 minutes</td>
        </tr>
        <tr>
          <td><Link to="/ielts-simulator/reading-practices/summary-completion-word-list">Summary Completion (Word List)</Link></td>
          <td>Fill in the blanks in a summary based on a list of words.</td>
          <td>10 minutes</td>
        </tr>
        <tr>
          <td><Link to="/ielts-simulator/reading-practices/diagram-completion">Diagram Completion</Link></td>
          <td>Fill in the blanks in a diagram based on the passage.</td>
          <td>10 minutes</td>
        </tr>
        <tr>
          <td><Link to="/ielts-simulator/reading-practices/flow-chart-completion">Flow Chart Completion</Link></td>
          <td>Fill in the blanks in a flow chart based on the passage.</td>
          <td>10 minutes</td>
        </tr>
        <tr>
          <td><Link to="/ielts-simulator/reading-practices/matching-headings">Matching Headings</Link></td>
          <td>Match headings to the correct paragraphs in the passage.</td>
          <td>10 minutes</td>
        </tr>
        <tr>
          <td><Link to="/ielts-simulator/reading-practices/matching-features">Matching Features</Link></td>
          <td>Match features to the correct subjects in the passage.</td>
          <td>10 minutes</td>
        </tr>
        <tr>
          <td><Link to="/ielts-simulator/reading-practices/matching-sentence-endings">Matching Sentence Endings</Link></td>
          <td>Match the correct ending to sentences based on information in the passage.</td>
          <td>10 minutes</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ReadingPracticesPage;