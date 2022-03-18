import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



function FoodItem({ food }) {
  
    console.log('in FoodItem');



    return (
    <>
      <td>{food.name}</td> 
      <td>{food.daily_amount_oz} oz per day</td>
    </>
    );
}

export default FoodItem;
