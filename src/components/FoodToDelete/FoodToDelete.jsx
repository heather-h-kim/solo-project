import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';


const styles = {
  "&.MuiButton-contained": {
    bgcolor: '#c85c92',
    fontSize:'16px'
  },
};



function FoodToDelete( {food} ) {
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
        const payloadToSend = {
            food_id: food.id,
            cat_id: cat.id
        }
        dispatch({type: 'DELETE_THIS_FOOD', payload: payloadToSend});
        
      }

    return (
    <>
     <TableCell align="left" sx={{width:'300px', fontSize:"20px"}}>{food.name}</TableCell>
      <TableCell align="right" sx={{width:'100px', fontSize:"20px"}} onClick={deleteThisFood}><Button sx={styles} variant="contained">Delete</Button></TableCell>

    </>
    );
}

export default FoodToDelete;
