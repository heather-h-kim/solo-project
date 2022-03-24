import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';


function FoodItem({ food }) {
  
    console.log('in FoodItem');



    return (
    <>
      <TableCell align="center" sx={{width:'100px', fontSize:"20px"}}>{food.name}</TableCell>
      <TableCell align="center" sx={{width:'250px', fontSize:"20px"}}>{food.daily_amount_oz} oz per day</TableCell>
    </>
    );
}

export default FoodItem;
