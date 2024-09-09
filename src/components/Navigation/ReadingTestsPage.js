import React from 'react';
import { Link } from 'react-router-dom';

const ReadingTestsPage = () => (
  <ul>
    <li><Link to="/reading/tests/test-1">Reading Test 1</Link></li>
    <li><Link to="/reading/tests/test-2">Reading Test 2</Link></li>
    <li><Link to="/reading/tests/test-3">Reading Test 3</Link></li>
  </ul>
);

export default ReadingTestsPage;