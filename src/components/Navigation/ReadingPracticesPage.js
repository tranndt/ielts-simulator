
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
          <td><Link to="/reading-practices/multiple-choice-select-one">Multiple Choice</Link></td>
          <td>Select the correct answer from a list of options.</td>
          <td>10 minutes</td>
        </tr>
        <tr>
          <td><Link to="/reading-practices/table-completion">Table Completion</Link></td>
          <td>Fill in the blanks in a table based on the passage.</td>
          <td>10 minutes</td>
        </tr>
        <tr>
          <td><Link to="/reading-practices/matching-headings">Matching Headings</Link></td>
          <td>Match headings to the correct paragraphs in the passage.</td>
          <td>10 minutes</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ReadingPracticesPage;