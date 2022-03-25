import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



function FoodToDelete( {food} ) {
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    const cat = store.thisCat;
    const {id} =useParams();

    console.log('in FoodToDelete');

    useEffect( () => {
        dispatch({type:'FETCH_FOODS', payload:cat.id});
      }, [])
   

    const deleteThisFood = () => {
        console.log('lets delete this food!');
        // dispatch({type: 'DELETE_THIS_FOOD', payload: food.id})
        const payloadToSend = {
            food_id: food.id,
            cat_id: cat.id
        }
        dispatch({type: 'DELETE_THIS_FOOD', payload: payloadToSend});
        
      }

    return (
    <>
     <TableCell align="left" sx={{width:'300px', fontSize:"20px"}}>{food.name}</TableCell>
      <TableCell align="right" sx={{width:'100px', fontSize:"20px"}} onClick={deleteThisFood}><Button>Delete</Button></TableCell>
      
{/* 
      <td><button onClick={deleteThisFood}>Delete</button></td> */}
    </>
    );
}

export default FoodToDelete;
