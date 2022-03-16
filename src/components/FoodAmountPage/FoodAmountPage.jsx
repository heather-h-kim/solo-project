import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function FoodAmountPage( ) {
  
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Food Amount Page');

  return (
    <div className="container">
      <h2>{heading}</h2>
    </div>
  );
}

export default FoodAmountPage;
