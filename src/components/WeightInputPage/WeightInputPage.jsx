import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


function WeightInputPage() {
  const store = useSelector((store) => store);
  const cat = store.thisCat;
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [goalWeight, setGoalWeight] = useState('');
  const [treat, setTreat] = useState('');

  useEffect(() => {
    dispatch({ type: 'FETCH_THIS_CAT', payload: Number(id) });
  }, []);

  //calculate recommended daily calories based on the user input(goal weight and treat%)
  const calculateCalorie = () => {
    console.log('calculate!');
    console.log('goalWeight is', goalWeight);
    console.log('treat is', treat);


    dispatch({ type: 'CALCULATE_CALORIE', payload: { id: cat.id, goal_weight: Number(goalWeight), treat_percentage: Number(treat) } })
    setGoalWeight('');
    setTreat('');
    // setClicked(!clicked)

  }

  const sendToFoodAmount = () => {
    console.log('sending the user to FoodAmountPage');
    history.push(`/food-amount/${cat.id}`)
  }

  const style = {
    position: 'absolute',
    top: '70%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    <div className="container">
      <p>What is the goal weight for {cat.name}?</p>
      <form onSubmit={calculateCalorie}>

        <FormControl fullWidth>
          <TextField label="Goal weight lbs" variant="outlined" value={goalWeight} onChange={event => setGoalWeight(event.target.value)} /> <br></br>
        </FormControl>
        <p>How much treats do you want to feed {cat.name}? It is recommended that you limit treats up to 10% of the daily calorie needs.</p>
        {/* <Box sx={{ display: 'flex', alignItems: 'center'  }}>  */}
        <FormControl fullWidth>
          <TextField label="Treat %" variant="outlined" value={treat} onChange={event => setTreat(event.target.value)} />
          {/* <Typography>%</Typography>  */}
        </FormControl><br></br>
        {/* </Box> */}

        <Button type="submit" sx={{ mt: 2 }} variant="contained" onClick={handleOpen}>Calculate the daily calorie</Button>
      </form>

      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul>
          <li>goal weight: {cat.goal_weight}lbs</li>
          <li>treat %: {cat.treat_percentage}%</li>
          <li>recommended daily calories: {cat.total_daily_cal}kcal</li>
          <li>recommended calories from treats: {cat.treat_cal}kcal</li>
          <li>recommended calories from foods: {cat.food_cal}kcal</li>
        </ul>
          </Typography>
        </Box>
      </Modal>

      <div>
        <ul>
          <li>goal weight: {cat.goal_weight}lbs</li>
          <li>treat %: {cat.treat_percentage}%</li>
          <li>recommended daily calories: {cat.total_daily_cal}kcal</li>
          <li>recommended calories from treats: {cat.treat_cal}kcal</li>
          <li>recommended calories from foods: {cat.food_cal}kcal</li>
        </ul><br></br>
        <button onClick={sendToFoodAmount}>Calculate the daily amount of foods</button>
      </div>

    </div>
  );
}

export default WeightInputPage;
