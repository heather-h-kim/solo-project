import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';


function ResultPage() {
  const store = useSelector((store) => store);
  const cat = store.thisCat;
  const foods = store.foods;
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  
  
  useEffect( () => {
    dispatch({type:'FETCH_THIS_CAT', payload: id});
  }, []);

  console.log('foods are', foods);
  return (
    <div className="container">
      <h3>{cat.name} </h3>
      </div>
  )};

export default ResultPage;
