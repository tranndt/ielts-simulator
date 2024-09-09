import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/Navigation/HomePage';
import About from './components/About/About';
import Header from './components/Navigation/Header';
import ReadingSectionFrame from './components/Reading/ReadingSectionFrame';
import passageMcq from './components/assets/json/mcq.json';
import passageTable from './components/assets/json/table.json';
import passageMatching from './components/assets/json/matching_headings.json';
import ReadingPracticesPage from './components/Navigation/ReadingPracticesPage';
import ReadingTestsPage from './components/Navigation/ReadingTestsPage';
import './App.css';
// import GradingComponent from './components/Grading/GradingComponent';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/reading-practices" element={<ReadingPracticesPage />} />
        <Route path="/reading-tests" element={<ReadingTestsPage />} />
        <Route path="/reading-practices/multiple-choice-select-one" element={<ReadingSectionFrame passage={passageMcq}/>} />
        <Route path="/reading-practices/table-completion" element={<ReadingSectionFrame passage={passageTable}/>} />
        <Route path="/reading-practices/matching-headings" element={<ReadingSectionFrame passage={passageMatching}/>} />
      </Routes>
    </div>
  );
}

export default App;
