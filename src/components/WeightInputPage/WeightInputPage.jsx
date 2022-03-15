import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';


function WeightInputPage() {
  const store = useSelector((store) => store);
  

  return (
    <div className="container">
        <p>weight input</p>
      
    </div>
  );
}

export default WeightInputPage;
