import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';


function CatInfoPage() {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Home Page');
  const history = useHistory();
  const dispatch = useDispatch();
  const cat = store.thisCat;
  const {id} =useParams();

  useEffect( () => {
    dispatch({type:'FETCH_THIS_CAT', payload: id});
  }, []);


  console.log('this cat is', cat);
  const sendToEditInfo = () => {
    history.push("/edit-info")
  }

  const sendToWeightInputPage = () => {
      history.push("/weight-input")
  }
  

  return (
    <div className="container">
        <ul>
            <li>Name: {cat.name}</li>
            <li>Age: {cat.age}</li>
            <li>Neuter-status: {cat.is_neutered} </li>
            <li>Current weight: {cat.current_weight}</li>
            <li>Current food: </li>
            
        </ul>
        <button onClick={sendToEditInfo}>Edit</button>
        <button onClick={sendToWeightInputPage}>Get the daily calorie!</button>
      
      
    </div>
  );
}

export default CatInfoPage;
