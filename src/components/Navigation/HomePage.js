import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function Home() {
  return (
<div className="home-page">
  <div className="jumbotron">
    <h1 className="display-4">Welcome to the IELTS Test Simulator</h1>
    <p>This web app provides a realistic simulation of the IELTS test, allowing you to practice under test conditions.</p>
    <p>You can take practice tests, review your answers, and track your progress over time. Our goal is to help you achieve the best possible score on your IELTS test.</p>
  </div>

  {/* Listening Section */}
  <div className="section-box">
    <h2>Listening</h2>
    <p>The IELTS Listening test includes 4 recordings, each with 10 questions. You will hear a variety of native English accents, and the questions will assess your ability to understand main ideas, detailed factual information, and opinions.</p>
    <p>With this simulator, you can practice listening to real-life conversations, lectures, and discussions, while answering IELTS-style questions to improve your listening skills.</p>
    <ul>
      <li><Link to="/listening-practices">Listening Question Types</Link></li>
      <li><Link to="/listening-tests">Listening Practice Tests</Link></li>
    </ul>
  </div>

  {/* Reading Section */}
  <div className="section-box">
    <h2>Reading</h2>
    <p>The IELTS Academic Reading test is divided into three parts, with a total of 40 questions. The passages range from descriptive and factual to discursive and analytical, and they may include diagrams, graphs, or illustrations.</p>
    <p>With this simulator, you can familiarize yourself with the IELTS reading test format and question types, practice reading full passages and answering questions to enhance your reading comprehension.</p>
    <ul>
      <li><Link to="/reading-practices">Reading Question Types</Link></li>
      <li><Link to="/reading-tests">Reading Practice Tests</Link></li>
    </ul>
  </div>

  {/* Writing Section */}
  <div className="section-box">
    <h2>Writing</h2>
    <p>The IELTS Academic Writing test has two tasks. Task 1 asks you to summarize, describe, or explain information in a graph, table, chart, or diagram. Task 2 involves writing an essay in response to a point of view, argument, or problem.</p>
    <p>With this simulator, you can practice both types of writing tasks, review sample answers, and receive tips on structuring your responses to achieve high marks.</p>
    <ul>
      <li><Link to="/writing-practices">Writing Question Types</Link></li>
      <li><Link to="/writing-tests">Writing Practice Tests</Link></li>
    </ul>
  </div>
</div>

  );
}

export default Home;