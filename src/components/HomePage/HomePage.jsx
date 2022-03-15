import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';


function HomePage() {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Home Page');
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch({type:'FETCH_CATS'});
  }, [])

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
