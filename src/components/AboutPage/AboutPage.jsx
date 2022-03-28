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
       <p>Figuring out how to send multiple http requests in the order that makes sense for the chained calculations that should be done in the database.</p>
      <h2>What's Next?</h2>
       <p>Adding a graph for a visual representation of the cat's weight change and allowing the user to upload the cat's photo to the cat information page for a little personal touch.</p>
    </div>
  );
}

export default About;
