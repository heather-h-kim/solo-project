import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';


function CatInfoPage() {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Home Page');
  const history = useHistory();
  const dispatch = useDispatch();
  const cat = store.thisCat;

  console.log('this cat is', cat);
  const sendToEditInfo = () => {
    history.push("/edit-cat")
  }

  const sendToWeightInputPage = () => {
      history.push("/weight-input")
  }

  return (
    <div className="container">
        <ul>
            <li>Name: {cat.name}</li>
            <li>Age: {cat.age}</li>
            <li>Neutered: {cat.is_neutered}</li>
            <li>Current weight: {cat.current_weight}</li>
            <li>Current food: </li>
            
        </ul>
        <button onClick={sendToEditInfo}>Edit</button>
        <button onClick={sendToWeightInputPage}>Get the daily calorie!</button>
      
      
    </div>
  );
}

export default CatInfoPage;
