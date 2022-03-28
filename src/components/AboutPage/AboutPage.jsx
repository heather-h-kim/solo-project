import React, { useState } from 'react';
import {useSelector} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function About(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <div className="container">
      <h2>Technologies used</h2>
      <ul style={{fontSize: 20}} >
        <li >Node</li>
        <li>Express</li>
        <li>React</li>
        <li>Redux</li>
        <li>PostgreSQL</li>
        <li>Saga</li>
        <li>Material-UI</li>
      </ul>
      <h2>Challenges</h2>
      <ul>
        <li>Figuring out SQL queries to do conditional calculations - the recommended calories change depending on cat's age and neuter status.<br></br></li>
        <li>Figuring out how to send multiple http requests for the chained calculations for each combination of foods</li>
      </ul>
      <h2>What's Next?</h2>
       <p>Adding a graph for a visual representation of the cat's weight change.</p>
    </div>
  );
}

export default About;
