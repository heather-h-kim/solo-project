import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const styles = {
    "&.MuiButton-contained": {
      bgcolor: '#c85c92',
      mt:'30px',
      fontSize:'16px'
    },
    "&.MuiTextField-root": {
        bgcolor: "#ffffff"
      },
  };

function AddCatPage() {
    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Add your cat');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [neutered, setNeutered] = useState('');
    const [weight, setWeight] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('in add cat handleSubmit');
        const newCat = {
            name: name,
            age: age,
            is_neutered: neutered,
            current_weight: weight
        };
        console.log('newCat is', newCat);
        const confirmation = confirm("Do you want to add this cat?")
        if (confirmation === true) {
            dispatch({ type: 'ADD_CAT', payload: newCat })
            setName('');
            setAge('');
            setNeutered('');
            setWeight('');
            alert(`${newCat.name} is added!`)
        }

    }

    const handleClick = () => {
        history.push("/user-home");
    }


    return (
        <div className="container">
            <h1>{heading}</h1>
            <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
                <TextField sx={styles} label="name" variant="outlined" value={name} onChange={event => setName(event.target.value)}/><br></br>
                <TextField sx={styles} label="weight" variant="outlined"  value={weight} onChange={event => setWeight(event.target.value)}/><br></br>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select  sx={{bgcolor:'#ffffff'}}
                          value={age} label="Age" onChange={event => setAge(event.target.value)}>
                    <MenuItem value={'kitten'}>Kitten</MenuItem>
                    <MenuItem value={'adult'}>Adult</MenuItem>
                </Select><br></br>
                </FormControl><br></br>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Neutered</InputLabel>
                <Select 
                        sx={{bgcolor:'#ffffff'}}
                        id="demo-simple-select" value={neutered} label="Neutered" onChange={event => setNeutered(event.target.value)}>
                            
                    <MenuItem value={'neutered'}>Neutered</MenuItem>
                    <MenuItem value={'intact'}>Intact</MenuItem>
                </Select><br></br>
                </FormControl>

           
            <Stack spacing={2} direction="row">
                
                <Button sx={styles} fullWidth type="submit" variant="contained">Add</Button>
              
            </Stack>
            </form>
        

        </div>
    );
}

export default AddCatPage;
