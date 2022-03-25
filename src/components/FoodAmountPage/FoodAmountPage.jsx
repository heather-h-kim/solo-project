import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { sizing } from '@mui/system';
import './FoodAmountPage.css';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



function FoodAmountPage() {
    const store = useSelector((store) => store);
    const user = store.user;
    const cat = store.thisCat;
    const foods = store.foods;
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [wetPercent, setWetPercent] = useState('');
    const [foodOneName, setFoodOneName] = useState('');
    const [foodTwoName, setFoodTwoName] = useState('');
    const [perCan, setPerCan] = useState('');
    const [foodOnePerKg, setFoodOnePerKg] = useState('');
    const [foodTwoPerKg, setFoodTwoPerKg] = useState('');
    const [perCup, setPerCup] = useState('');
    const [wetFoodId, setWetFoodId] = useState('');
    const [dryFoodId, setDryFoodId] = useState('');

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

    const handleSubmit = () => {
        console.log('in food amount handle submit');

        // //Update the wet food percentage of this cat
        // dispatch({ type: 'EDIT_WET_PERCENTAGE', payload: { id: cat.id, wet_percentage: Number(wetPercent) } });


        if (Number(wetPercent) === 0) {
            //if the user feeds the cat dry food only
            if (foodTwoName === '') {
                //if the user keeps feeding the cat the current dry food
                dispatch({ type: 'CALCULATE_FOOD_AMOUNT', payload: { cat_id: cat.id, food_id: Number(dryFoodId), wet_percentage: Number(wetPercent) } })
            } else {
                //if the user feeds the cat new dry food
                dispatch({
                    type: 'ADD_DRY_FOOD',
                    payload: {
                        cat_id: cat.id,
                        name: foodTwoName,
                        type: 'dry',
                        cal_per_cup: Number(perCup),
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
                        cal_per_can: Number(perCan),
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
                        cal_per_can: Number(perCan),
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
                        cal_per_cup: Number(perCup),
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
                        cal_per_can: Number(perCan),
                        wet_cal_per_kg: Number(foodOnePerKg),
                        dry_name: foodTwoName,
                        dry_type: 'dry',
                        cal_per_cup: Number(perCup),
                        dry_cal_per_kg: Number(foodTwoPerKg),
                        wet_percentage: Number(wetPercent)
                    }
                })
            }
        }

        setWetPercent('');
        setFoodOneName('');
        setFoodTwoName('');
        setPerCan('');
        setFoodOnePerKg('');
        setFoodTwoPerKg('');
        setPerCup('');
        setWetFoodId('');
        setDryFoodId('');
        history.push(`/result/${cat.id}`);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth >
                    <p className="title">Desired % of calories from wet food:</p>
                    <TextField sx={{ mb: '8px' }} size='small' label="Wet food %" variant="outlined" value={wetPercent} onChange={event => setWetPercent(event.target.value)} />
                </FormControl>
                    <p className="title">Wet food Info</p>
                    <p>Select your wet food from the current foods</p>
                    <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Wet foods</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={wetFoodId}
                        label="Age"
                        onChange={event => setWetFoodId(event.target.value)}>
                        {foods.filter(wet).map((food, i) => {
                            return <MenuItem key={i} value={food.id}>{food.name} </MenuItem>
                        })}
                    </Select>
                    </FormControl>
                    <FormControl fullWidth >
                    <p>or Enter the new food information</p>

                    <TextField sx={{ mb: '8px' }} label="Food name" variant="outlined" value={foodOneName} onChange={event => setFoodOneName(event.target.value)} />
                    <TextField sx={{ mb: '8px' }} label="Calories per kg" variant="outlined" value={foodOnePerKg} onChange={event => setFoodOnePerKg(event.target.value)} />
                    <TextField sx={{ mb: '8px' }} label="Calories per can" variant="outlined" value={perCan} onChange={event => setPerCan(event.target.value)} />
                    </FormControl>
                    <p className="title">Dry food Info</p>
                    <p>Select your dry food from the current foods</p>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Dry foods</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dryFoodId}
                        label="Age"
                        onChange={event => setDryFoodId(event.target.value)}>
                        {foods.filter(dry).map((food, i) => {
                            return <MenuItem key={i} value={food.id}>{food.name} </MenuItem>
                        })}
                    </Select>
                    </FormControl>
                    <FormControl fullWidth>
                    <p>or Enter the new food information</p>
                    <TextField sx={{ mb: '8px' }} label="Food name" variant="outlined" value={foodTwoName} onChange={event => setFoodTwoName(event.target.value)} />
                    <TextField sx={{ mb: '8px' }} label="Calories per kg" variant="outlined" value={foodTwoPerKg} onChange={event => setFoodTwoPerKg(event.target.value)} />
                    <TextField sx={{ mb: '8px' }} label="Calories per cup" variant="outlined" value={perCup} onChange={event => setPerCup(event.target.value)} />
                    <Button variant="contained" type="submit">Submit</Button>
                </FormControl><br></br>
               
            </form>
          
        </div>
    );

}

export default FoodAmountPage;
