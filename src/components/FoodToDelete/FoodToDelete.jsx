import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';



function FoodToDelete( {food} ) {
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const cats = store.cats;
    const {id} =useParams();

    console.log('in FoodToDelete');

    useEffect( () => {
        dispatch({type:'FETCH_FOODS', payload:id});
      }, [])
   

    const deleteThisFood = () => {
        console.log('lets delete this food!');
        dispatch({type: 'DELETE_THIS_FOOD', payload: food.id})
        const payloadToSend = {
            food_id: food.id,
            cat_id: id
        }
        dispatch({type: 'DELETE_THIS_FOOD', payload: payloadToSend});
        
      }

    return (
    <>
      <td>{food.name}</td> 
      <td><button onClick={deleteThisFood}>Delete</button></td>
    </>
    );
}

export default FoodToDelete;
