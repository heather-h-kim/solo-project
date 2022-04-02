import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './FoodAmountPage.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


const styles = {
    "&.MuiTextField-root": {
        bgcolor: "#ffffff",
        marginTop: '15px'
    },
    "&.MuiButton-contained": {
        bgcolor: '#c85c92',
        marginTop: '12px',
        fontSize: '16px'
    },
};



function FoodAmountPage() {
    const store = useSelector((store) => store);
    const cat = store.thisCat;
    const foods = store.foods;
    const { id } = useParams();
    const dispatch = useDispatch();
    const [wetPercent, setWetPercent] = useState('');
    const [foodOneName, setFoodOneName] = useState('');
    const [foodTwoName, setFoodTwoName] = useState('');
    const [foodOnePerKg, setFoodOnePerKg] = useState('');
    const [foodTwoPerKg, setFoodTwoPerKg] = useState('');
    const [wetFoodId, setWetFoodId] = useState('');
    const [dryFoodId, setDryFoodId] = useState('');
    const [clicked, setClicked] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 3,
      };

    useEffect(() => {
        dispatch({ type: 'FETCH_THIS_CAT', payload: Number(id) });
        dispatch({ type: 'FETCH_FOODS', payload: Number(id) });
    }, []);

    // states needed to filter foods - would be used for dropdown options
    const wet = (food) => {
        return food.type === 'wet';
    }
    const dry = (food) => {
        return food.type === 'dry';
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('in food amount handle submit');


        //if the user feeds the cat dry food only
        if (Number(wetPercent) === 0) {
           //if the user keeps feeding the cat the current dry food
            if (foodTwoName === '') {
                dispatch({ type: 'CALCULATE_FOOD_AMOUNT', payload: { cat_id: cat.id, food_id: Number(dryFoodId), wet_percentage: Number(wetPercent) } })
            } else {
                //if the user feeds the cat new dry food
                dispatch({
                    type: 'ADD_DRY_FOOD',
                    payload: {
                        cat_id: cat.id,
                        name: foodTwoName,
                        type: 'dry',
                        cal_per_kg: Number(foodTwoPerKg),
                        wet_percentage: Number(wetPercent)
                    }
                });
            }
            //if the user feeds the cat wet food only
        } else if (Number(wetPercent) === 100) {
            // if the user keeps feeding the cat the current wet food
            if (foodOneName === '') {
                dispatch({ type: 'CALCULATE_FOOD_AMOUNT', payload: { cat_id: cat.id, food_id: Number(wetFoodId), wet_percentage: Number(wetPercent) } })
                //if the user feeds the cat new wet food
            } else {
                dispatch({
                    type: 'ADD_WET_FOOD',
                    payload: {
                        cat_id: cat.id,
                        name: foodOneName,
                        type: 'wet',
                        cal_per_kg: Number(foodOnePerKg),
                        wet_percentage: Number(wetPercent)
                    }
                });
            }
            //if the user feeds the cat both dry food and wet food
        } else {
            //if the user feeds the cat current foods
            if (foodTwoName === '' && foodOneName === '') {
                dispatch({
                    type: 'CALCULATE_WET_DRY_AMOUNT',
                    payload: {
                        cat_id: cat.id,
                        wetFood_id: Number(wetFoodId),
                        dryFood_id: Number(dryFoodId),
                        wet_percentage: Number(wetPercent)
                    }
                })
                //if the user feeds the cat new wet food and the current dry food
            } else if (foodTwoName === '' && foodOneName !== '') {
                dispatch({
                    type: 'ADD_WET_FOOD_AND_UPDATE_DRY_FOOD',
                    payload: {
                        cat_id: cat.id,
                        dryFood_id: Number(dryFoodId),
                        wet_name: foodOneName,
                        wet_type: 'wet',
                        wet_cal_per_kg: Number(foodOnePerKg),
                        wet_percentage: Number(wetPercent)
                    }
                })
                //if the user feeds the cat new dry food and the current wet food
            } else if (foodTwoName !== '' && foodOneName === '') {
                dispatch({
                    type: 'ADD_DRY_FOOD_AND_UPDATE_WET_FOOD',
                    payload: {
                        cat_id: cat.id,
                        wetFood_id: Number(wetFoodId),
                        dry_name: foodTwoName,
                        dry_type: 'dry',
                        dry_cal_per_kg: Number(foodTwoPerKg),
                        wet_percentage: Number(wetPercent)
                    }
                })
                //if the user feeds the cat new dry food and new wet food
            } else if (foodTwoName !== '' && foodOneName !== '') {
                dispatch({
                    type: 'ADD_WET_DRY_FOOD',
                    payload: {
                        cat_id: cat.id,
                        wet_name: foodOneName,
                        wet_type: 'wet',
                        wet_cal_per_kg: Number(foodOnePerKg),
                        dry_name: foodTwoName,
                        dry_type: 'dry',
                        dry_cal_per_kg: Number(foodTwoPerKg),
                        wet_percentage: Number(wetPercent)
                    }
                })
            }
        }
        
        setClicked(!clicked);
        setWetPercent('');
        setFoodOneName('');
        setFoodTwoName('');
        setFoodOnePerKg('');
        setFoodTwoPerKg('');
        setWetFoodId('');
        setDryFoodId('');
    }
 
    return (
        <div className="container" style={{ marginTop: '10px' }} >
            <form onSubmit={handleSubmit}>

                <FormControl fullWidth >
                    <p className="title">Desired % of calories from wet food:</p>
                    <TextField size='small' autoComplete="off" sx={{ mb: '8px', bgcolor: '#ffffff' }} label="wet food %" variant="outlined" value={wetPercent} onChange={event => setWetPercent(event.target.value)} />
                </FormControl>
                <p className="title">Wet food Info</p>
                <p className="p-small">Select your wet food from the current foods</p>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Wet foods</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={wetFoodId}
                        label="Age"
                        size='small'
                        sx={{ bgcolor: '#ffffff', mb:'10px' }}
                        onChange={event => setWetFoodId(event.target.value)}>
                        {foods.filter(wet).map((food, i) => {
                            return <MenuItem key={i} value={food.id}>{food.name} </MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl fullWidth >
                    <p className="p-small">or Enter the new food information</p>
                    <TextField size='small' sx={{ mb: '8px', bgcolor: '#ffffff' }} label="Food name" variant="outlined" value={foodOneName} onChange={event => setFoodOneName(event.target.value)} />
                    <TextField size='small' autoComplete="off" sx={{ mb: '4px', bgcolor: '#ffffff' }} label="Calories per kg" variant="outlined" value={foodOnePerKg} onChange={event => setFoodOnePerKg(event.target.value)} />         
                </FormControl>
                <p className="title">Dry food Info</p>
                <p className="p-small">Select your dry food from the current foods</p>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Dry foods</InputLabel>
                    <Select
                        size='small'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dryFoodId}
                        label="Age"
                        sx={{ bgcolor: '#ffffff', mb:'10px'  }}
                        onChange={event => setDryFoodId(event.target.value)}>
                        {foods.filter(dry).map((food, i) => {
                            return <MenuItem key={i} value={food.id}>{food.name} </MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <p className="p-small">or Enter the new food information</p>
                    <TextField size='small' sx={{ mb: '8px', bgcolor: '#ffffff' }} label="Food name" variant="outlined" value={foodTwoName} onChange={event => setFoodTwoName(event.target.value)} />
                    <TextField size='small' autoComplete="off" sx={{ mb: '4px', bgcolor: '#ffffff' }} label="Calories per kg" variant="outlined" value={foodTwoPerKg} onChange={event => setFoodTwoPerKg(event.target.value)} />
                    <Button  sx={styles} variant="contained" type="submit">Submit</Button>
                </FormControl><br></br>

            </form>
            {clicked &&
                <Box  sx={{ fontSize: "20px", mt: "10px", mb: "4px" }}>
                    {cat.name} needs
                    {foods.map((food, i) => (
                        <List key={i}>
                            <ListItem sx={{mb:'0px', p:'2px'}}key={i}>{food.daily_amount_oz} oz of {food.name} a day.</ListItem>
                        </List>
                    ))}
                </Box>

            }
        </div>
    );

}

export default FoodAmountPage;
