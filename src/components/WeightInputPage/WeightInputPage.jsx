import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const styles = {
  "&.MuiTextField-root": {
    bgcolor: "#ffffff",
    marginTop: '15px'
  },
  "&.MuiButton-contained": {
    bgcolor: '#c85c92',
    marginTop:'50px',
    fontSize:'16px'
  },
};


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
          <TextField autoComplete="off" sx={styles} label="Goal weight lbs" variant="outlined" value={goalWeight} onChange={event => setGoalWeight(event.target.value)} /> <br></br>
        </FormControl>
        <p>How much treats do you want to feed {cat.name}? It is recommended that you limit treats up to 10% of the daily calorie needs.</p>
        <FormControl fullWidth>
          <TextField autoComplete="off" sx={styles} label="Treat %" variant="outlined" value={treat} onChange={event => setTreat(event.target.value)} />
          <Button type="submit" sx={styles} variant="contained">Calculate the daily calorie</Button>
        </FormControl><br></br>

      </form>

      {clicked &&

          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#ffe6ee' }}>
            <List>
              <ListItem sx={{ fontSize: "20px", mt: "10px", mb: "4px" }} disablePadding>
                Goal weight:<span style={{fontWeight:'bold'}}>{cat.goal_weight}lbs</span>
              </ListItem>
              <ListItem sx={{ fontSize: "20px", mb: "4px" }} disablePadding>
                Treat %: <span style={{fontWeight:'bold'}}>{cat.treat_percentage}%</span>
              </ListItem>
              <ListItem sx={{ fontSize: "20px", mb: "4px" }} disablePadding>
                Recommended daily calories: <span style={{fontWeight:'bold'}}>{cat.total_daily_cal}kcal</span>
              </ListItem>
              <ListItem sx={{ fontSize: "20px", mb: "4px" }} disablePadding>
                The calories from treats: <span style={{fontWeight:'bold'}}>{cat.treat_cal}kcal</span>
              </ListItem>
              <ListItem sx={{ fontSize: "20px", mb: "15px" }} disablePadding>
                The calories from foods: <span style={{fontWeight:'bold'}}>{cat.food_cal}kcal</span>
              </ListItem>
            </List>
          </Box>
      }
      <Button fullWidth type="submit" sx={styles} variant="contained" onClick={sendToFoodAmount}>Calculate the food amount</Button>

    </div>
  );
}

export default WeightInputPage;
