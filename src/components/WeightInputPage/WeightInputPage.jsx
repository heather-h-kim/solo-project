import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
// import { InputLabel } from '@mui/material';
// import { Input } from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';



function WeightInputPage() {
  const store = useSelector((store) => store);
  const cat = store.thisCat;
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [goalWeight, setGoalWeight] = useState('');
  const [treat, setTreat] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_THIS_CAT', payload: Number(id) });
  }, []);

  //calculate recommended daily calories based on the user input(goal weight and treat%)
  const calculateCalorie = (event) => {
    event.preventDefault();
    console.log('calculate!');
    console.log('goalWeight is', goalWeight);
    console.log('treat is', treat);


    dispatch({ type: 'CALCULATE_CALORIE', payload: { id: cat.id, goal_weight: Number(goalWeight), treat_percentage: Number(treat) } })
    setGoalWeight('');
    setTreat('');
    setClicked(!clicked);

  }

  const sendToFoodAmount = () => {
    console.log('sending the user to FoodAmountPage');
    setClicked(!clicked);
    history.push(`/food-amount/${cat.id}`);
  }



  return (
    <div className="container">
      <p>What is the goal weight for {cat.name}?</p>
      <form onSubmit={calculateCalorie}>

        <FormControl fullWidth>
          <TextField label="Goal weight lbs" variant="outlined" value={goalWeight} onChange={event => setGoalWeight(event.target.value)} /> <br></br>
        </FormControl>
        <p>How much treats do you want to feed {cat.name}? It is recommended that you limit treats up to 10% of the daily calorie needs.</p>
        <FormControl fullWidth>
          <TextField label="Treat %" variant="outlined" value={treat} onChange={event => setTreat(event.target.value)} />
          <Button type="submit" sx={{ mt: 4 }} variant="contained">Calculate the daily calorie</Button>
        </FormControl><br></br>


        
      </form>

      {clicked &&
        <>
            <ul>
              <li>goal weight: {cat.goal_weight}lbs</li>
              <li>treat %: {cat.treat_percentage}%</li>
              <li>recommended daily calories: {cat.total_daily_cal}kcal</li>
              <li>recommended calories from treats: {cat.treat_cal}kcal</li>
              <li>recommended calories from foods: {cat.food_cal}kcal</li>
            </ul>
      
         
        <Button fullWidth type="submit" sx={{ mt: 2 }} variant="contained" onClick={sendToFoodAmount}>Calculate the food amount</Button>
       </>
      }

    </div>
  );
}

export default WeightInputPage;
