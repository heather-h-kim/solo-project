import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const styles = {
  "&.MuiTextField-root": {
    bgcolor: "#ffffff",
    marginTop: '15px',
    mb: '8px'
  },
  "&.MuiButton-contained": {
    bgcolor: '#c85c92',
    marginTop: '8px',
    fontSize: '16px'
  },
};
function AdjustDailyCalorie() {

  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const cat = store.thisCat;
  const { id } = useParams();
  const [direction, setDirection] = useState('');
  const [adjustment, setAdjustment] = useState('');
  const [treat, setTreat] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_THIS_CAT', payload: Number(id) });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('in handleSubmit!');


    dispatch({
      type: 'ADJUST_CALORIE',
      payload: {
        cat_id: cat.id,
        adjustment_direction: direction,
        adjustment_percentage: Number(adjustment),
        treat_percentage: Number(treat)
      }
    });
    setDirection('');
    setAdjustment('');
    setTreat('');
    setClicked(!clicked);
  }

  const handleClick = () => {
    setClicked(!clicked);
    history.push(`/food-amount/${cat.id}`);
  }


  return (
    <div className="container">
      <p>Let's adjust the daily calorie. By how much do you want to adjust? Current daily calories is {cat.total_daily_cal}.</p>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="increase" control={<Radio />} label="Increase" onChange={event => setDirection(event.target.value)} />
            <FormControlLabel value="decrease" control={<Radio />} label="Decrease" onChange={event => setDirection(event.target.value)} /><br></br>

            <FormControl fullWidth >
              <p>By how much?</p>

              <TextField sx={styles} label="%" variant="outlined" value={adjustment} onChange={event => setAdjustment(event.target.value)} />
            </FormControl>
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth>
          <p>Do you still want the treat % at {cat.treat_percentage}%?</p>
          <p>Desired % of the daily calories from treats:</p>
          <TextField sx={styles} label="treat %" variant="outlined" value={treat} onChange={event => setTreat(event.target.value)} /><br></br>
          <Button sx={styles} type="submit" variant="contained">Submit</Button><br></br>
        </FormControl>

      </form>
      {clicked &&
        <>
          <Typography sx={{ fontSize: '20px' }}>
            {cat.name} now needs {cat.total_daily_cal}kcal a day. <br></br> {cat.treat_cal}kcal is from treats and {cat.food_cal}kcal is from food.
          </Typography>
          <Button sx={styles} fullWidth variant="contained" onClick={handleClick}>Get the food amount</Button>
        </>
      }

    </div>
  );
}

export default AdjustDailyCalorie;
