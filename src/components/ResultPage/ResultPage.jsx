import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Button from '@mui/material/Button';


function ResultPage() {
  const store = useSelector((store) => store);
  const cat = store.thisCat;
  const foods = store.foods;
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
 
  
  
  useEffect( () => {
    dispatch({type:'FETCH_THIS_CAT', payload: Number(id)});
    dispatch({type:'FETCH_FOODS', payload: Number(id)});
  }, []);
  
  const handleClick = () => {
    history.push(`/food-amount/${cat.id}`);
  }
  console.log('foods are', foods);
  return (
    <div className="container">
      <h3>{cat.name} needs</h3>
      {foods.map((food,i) => (
          <ul key={i}>
              <li>{food.daily_amount_oz} oz of {food.name} a day. </li>
          </ul>
      ))}

    <Button variant="contained" onClick={handleClick}>Prev</Button> 
      </div>
  )};

export default ResultPage;
