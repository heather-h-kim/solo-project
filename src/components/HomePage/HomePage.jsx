import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';


function HomePage() {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Home Page');
  const history = useHistory();

  const handleClick = () =>{
    history.push("/add-cat");
  }

  return (
    <div className="container">
      <h2>{heading}</h2>
      <p> Your cats:</p>
      <button onClick={handleClick}>Add Cat</button>
    </div>
  );
}

export default HomePage;
