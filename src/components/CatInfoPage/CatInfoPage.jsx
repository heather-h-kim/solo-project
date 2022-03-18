import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';


function CatInfoPage() {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Home Page');
  const history = useHistory();
  const dispatch = useDispatch();
  const cat = store.thisCat;
  const foods = store.foods;
  const {id} =useParams();

  useEffect( () => {
    dispatch({type:'FETCH_THIS_CAT', payload: Number(id)});
  }, []);


  console.log('this cat is', cat);
  const sendToEditInfo = () => {
    history.push(`/edit-cat/${cat.id}`)
  }

  const sendToWeightInputPage = () => {
      history.push(`/weight-input/${cat.id}`);
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
                {/* Current food: 
                {foods.map((food, i) => (
                  <ul key={i}> 
                    <li>{food.name}</li>
                  </ul>
                ))} */}
              


          
        <button onClick={sendToEditInfo}>Edit</button>
        <button onClick={sendToWeightInputPage}>Get the daily calorie!</button>
      
      
    </div>
  );
}

export default CatInfoPage;
