import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';



function AdjustDailyCalorie() {
  
    const store = useSelector((store) => store);
    const history = useHistory();
    const dispatch = useDispatch();
    const cat = store.thisCat;
    const {id} =useParams();
  
    useEffect( () => {
      dispatch({type:'FETCH_THIS_CAT', payload: Number(id)});
    }, []);



  return (
    <div>
      <p>Let's adjust  daily calorie. By how much do you want to adjust? Current daily calories is </p>
    </div>
  );
}

export default AdjustDailyCalorie;
