import React from 'react';
import { Link } from 'react-router-dom';

const jsonResources = require.context('../../data/reading-tests', true, /\.json$/);

const ReadingTestsPage = () =>{
  const createLinks = () =>  jsonResources.keys().map((key) => {
    const path = key.replace('./', '').replace('.json', '');
    const passage = jsonResources(key);
    return (
      <li><Link
      to={`/ielts-simulator/reading-tests/${path}`}>{path}</Link></li>
    );
});
  return(
    <ul>
      {createLinks()}
      {/* <li><Link to="/ielts-simulator/reading-tests/cam-11-test-1/cam-11-test-1-1">Reading Test 1</Link></li>
       */}
      {/* <li><Link to="/reading-tests/test-2">Reading Test 2</Link></li>
      <li><Link to="/reading-tests/test-3">Reading Test 3</Link></li> */}
    </ul>
)};

export default ReadingTestsPage;