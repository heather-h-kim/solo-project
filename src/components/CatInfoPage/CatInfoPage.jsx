import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import FoodItem from '../FoodItem/FoodItem';


function CatInfoPage() {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Home Page');
  const history = useHistory();
  const dispatch = useDispatch();
  const cat = store.thisCat;
  const foods = store.foods;
  const {id} =useParams();
  console.log('id is', id);

  useEffect( () => {
    dispatch({type:'FETCH_THIS_CAT', payload: Number(id)});
    
  }, []);


  console.log('this cat is', cat);
  const sendToEditInfo = () => {
    history.push(`/edit-cat/${id}`)
  }

  const sendToWeightInputPage = () => {
      history.push(`/weight-input/${id}`);
  }
  
  const sendToHome = () => {
    history.push('/user-home');
  }
  console.log('foods are', foods);
  return (
    <div className="container">
        <ul>
            <li>Name: {cat.name}</li>
            <li>Age: {cat.age}</li>
            <li>Neuter-status: {cat.is_neutered} </li>
            <li>Current weight: {cat.current_weight}</li>
        </ul>
                Current food: 
                <table>
                  <thead>
                    <tr>
                    <th>Name</th>
                    <th>daily amount</th>
                    </tr>
                  </thead>
                  <tbody>
                  {foods.map((food, i) => (
                  <tr key={i}> 
                    <FoodItem food={food}/>
                  </tr>
                 ))}
                  </tbody>
                </table>


             


          
        <button onClick={sendToEditInfo}>Edit</button>
        <button onClick={sendToWeightInputPage}>Get the daily calorie!</button>
        <button onClick={sendToHome}>Back</button>
      
      
    </div>
  );
}

export default CatInfoPage;
