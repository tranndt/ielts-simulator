import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/Navigation/HomePage';
import About from './components/About/About';
import Header from './components/Navigation/Header';
import ReadingSectionFrame from './components/Reading/ReadingSectionFrame';
import passageMultipleChoiceSelectOne from './components/assets/json/multiple_choice_select_one.json';
import passageTableCompletion from './components/assets/json/table_completion.json';
import passageNoteCompletion from './components/assets/json/note_completion.json';
import passageSentenceCompletion from './components/assets/json/sentence_completion.json';
import passageSummaryCompletion from './components/assets/json/summary_completion.json';
import passageMatchingHeadings from './components/assets/json/matching_headings.json';
import passageMatchingFeatures from './components/assets/json/matching_features.json';
import passageMatchingSentenceEndings from './components/assets/json/matching_sentence_endings.json';

import ReadingPracticesPage from './components/Navigation/ReadingPracticesPage';
import ReadingTestsPage from './components/Navigation/ReadingTestsPage';
import './App.css';
// import GradingComponent from './components/Grading/GradingComponent';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/ielts-simulator" element={<HomePage />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/ielts-simulator/reading-practices" element={<ReadingPracticesPage />} />
        <Route path="/ielts-simulator/reading-tests" element={<ReadingTestsPage />} />
        <Route path="/ielts-simulator/reading-practices/multiple-choice-select-one" element={<ReadingSectionFrame passage={passageMultipleChoiceSelectOne}/>} />
        <Route path="/ielts-simulator/reading-practices/table-completion" element={<ReadingSectionFrame passage={passageTableCompletion}/>} />
        <Route path="/ielts-simulator/reading-practices/note-completion" element={<ReadingSectionFrame passage={passageNoteCompletion}/>} /> 
        <Route path="/ielts-simulator/reading-practices/sentence-completion" element={<ReadingSectionFrame passage={passageSentenceCompletion}/>} />
        <Route path="/ielts-simulator/reading-practices/summary-completion" element={<ReadingSectionFrame passage={passageSummaryCompletion}/>} />
        <Route path="/ielts-simulator/reading-practices/matching-headings" element={<ReadingSectionFrame passage={passageMatchingHeadings}/>} />
        <Route path="/ielts-simulator/reading-practices/matching-features" element={<ReadingSectionFrame passage={passageMatchingFeatures}/>} />
        <Route path="/ielts-simulator/reading-practices/matching-sentence-endings" element={<ReadingSectionFrame passage={passageMatchingSentenceEndings}/>} />
      </Routes>
    </div>
  );
}

export default App;
