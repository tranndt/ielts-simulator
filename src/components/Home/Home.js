import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
    <div className="jumbotron">
      <h1 className="display-4">Welcome to the IELTS Test Simulator</h1>
      <p className="lead">Prepare for your IELTS test with our simulator and get the practice you need to succeed.</p>
      <hr className="my-4" />
      <p>This web app provides a realistic simulation of the IELTS test, allowing you to practice under test conditions. You can take practice tests, review your answers, and track your progress over time. Our goal is to help you achieve the best possible score on your IELTS test.</p>
      {/* <p>Sign up or log in to start your test simulation.</p>
      <Link className="btn btn-primary btn-lg" to="/signup" role="button">Sign Up</Link>
      <Link className="btn btn-secondary btn-lg ml-3" to="/login" role="button">Log In</Link> */}
    </div>
  </div>
  );
}

export default Home;
