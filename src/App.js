import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/Navigation/HomePage';
import About from './components/About/About';
import Header from './components/Navigation/Header';
import ReadingSectionFrame from './components/Reading/ReadingSectionFrame';
import ReadingPracticesPage from './components/Navigation/ReadingPracticesPage';
import ReadingTestsPage from './components/Navigation/ReadingTestsPage';
import './App.css';

const jsonResources = require.context('./data/', true, /\.json$/);

function App() {
  // Take in a path, load the json resources in that path and create routes from them
  const createRoutes = () =>  jsonResources.keys().map((key) => {
      const path = key.replace('./', '').replace('.json', '');
      const passage = jsonResources(key);
      console.log(key)
      return (
        <Route
          key={path}
          path={`/ielts-simulator/${path}`}
          element={<ReadingSectionFrame passage={passage} />}
        />
      );
  });
  
    
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/ielts-simulator" element={<HomePage />} />
        <Route path="/ielts-simulator/reading-practices" element={<ReadingPracticesPage />} />
        <Route path="/ielts-simulator/reading-tests" element={<ReadingTestsPage />} />
        {createRoutes()}
      </Routes>
    </div>
  );
}

export default App;