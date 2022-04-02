import React from 'react';

function About(props) {
  return (
    <div className="container">
      <h2>Technologies used</h2>
      <ul style={{fontSize: 19}} >
        <li >Node</li>
        <li>Express</li>
        <li>React</li>
        <li>Redux</li>
        <li>PostgreSQL</li>
        <li>Saga</li>
        <li>Material-UI</li>
      </ul>
      <h2>Challenges</h2>
      <ul style={{fontSize: 19}}>
        <li>Figuring out SQL queries to do conditional calculations - the recommended calories change depending on cat's age and neuter status.<br></br></li>
        <li>Figuring out how to send data and multiple http requests for the chained calculations for each food combination.</li>
      </ul>
      <h2>What's Next?</h2>
       <p style={{fontSize: 19}}>Adding a graph for a visual representation of the cat's weight change.</p>
    </div>
  );
}

export default About;
