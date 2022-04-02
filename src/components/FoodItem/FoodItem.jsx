import React from 'react';
import TableCell from '@mui/material/TableCell';


function FoodItem({ food }) {
  
    console.log('in FoodItem');



    return (
    <>
      <TableCell align="center" sx={{width:'100px', fontSize:"18px"}}>{food.name}</TableCell>
      <TableCell align="center" sx={{width:'250px', fontSize:"18px"}}>{food.daily_amount_oz} oz per day</TableCell>
    </>
    );
}

export default FoodItem;
