import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Header from './components/Header/Header';
import ReadingSectionFrame from './components/Reading/ReadingSectionFrame';
import passageMcq from './components/assets/json/mcq.json';
import passageTable from './components/assets/json/table.json';
import passageMatching from './components/assets/json/matching_headings.json';
import './App.css';
import GradingComponent from './components/Grading/GradingComponent';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/passage-mcq" element={<ReadingSectionFrame passage={passageMcq}/>} />
        <Route path="/passage-table" element={<ReadingSectionFrame passage={passageTable}/>} />
        <Route path="/passage-matching" element={<ReadingSectionFrame passage={passageMatching}/>} />
      </Routes>
    </div>
  );
}

export default App;
