import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function AdjustDailyCalorie() {
  
    const store = useSelector((store) => store);
    const history = useHistory();
    const dispatch = useDispatch();
    const cat = store.thisCat;
    const {id} =useParams();
    const [direction, setDirection] = useState('');
    const [adjustment, setAdjustment] = useState('');
    const [treat, setTreat] = useState('');
  
    useEffect( () => {
      dispatch({type:'FETCH_THIS_CAT', payload: Number(id)});
    }, []);

    const handleSubmit=() => {
      console.log('in handleSubmit!');
      const newCalorie = {
        cat_id: cat.id,
        adjustment_direction: direction,
        adjustment_percentage: Number(adjustment),
        treat_percentage: Number(treat)
      };

      console.log('newCalorie is', newCalorie);

      dispatch({type:'ADJUST_CALORIE', payload: newCalorie})

      
    }
    
    const handleClick = () => {
      history.push(`/food-amount/${cat.id}`)
    }
  

  return (
    <div className="container">
      <p>Let's adjust the daily calorie. By how much do you want to adjust? Current daily calories is {cat.total_daily_cal}.</p>
      
      <form onSubmit={handleSubmit}>
            <input type="radio" value="increase" name="direction" onChange={event => setDirection(event.target.value)} />Increase
            <input type="radio" value="decrease" name="direction" onChange={event => setDirection(event.target.value)} />Decrease
         <br></br>
          By how much?
            <input type="number" value={adjustment} onChange={event => setAdjustment(event.target.value)} />%
        
          <p>Do you still want the treat % at {cat.treat_percentage}%?</p>
          Desired % of the daily calories from treats:
          <input type="number"
                 placeholder="treat %"
                 value={treat}
                 onChange={event => setTreat(event.target.value)} 
                 /> %
        <br></br>
         
          <button type="submit">Submit</button>
      </form>

      <p>{cat.name} now needs {cat.total_daily_cal}kcal a day.</p>
      <p>{cat.name} now needs {cat.treat_cal}kcal from treats and {cat.food_cal} from food.</p>
      <button onClick={handleClick}>Get the food amount</button>
   
    </div>
  );
}

export default AdjustDailyCalorie;
