import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Header from './components/Header';
import PassagePage from './components/PassagePage';
import passageMcq from './components/mcq.json';
import passageTable from './components/table.json';

function App() {
  console.log(passageMcq);
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/passage-mcq" element={<PassagePage passage={passageMcq}/>} />
        <Route path="/passage-table" element={<PassagePage passage={passageTable}/>} />
      </Routes>
    </div>
  );
}

export default App;
