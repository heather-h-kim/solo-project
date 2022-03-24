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
                <TextField  label="name" variant="outlined" value={name} onChange={event => setName(event.target.value)}/><br></br>
                <TextField  label="weight" variant="outlined"  value={weight} onChange={event => setWeight(event.target.value)}/><br></br>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select  
                labelId="demo-simple-select-label" 
                // sx={{ width: '100px', height: '50px'}}
                         id="demo-simple-select" value={age} label="Age" onChange={event => setAge(event.target.value)}>
                    <MenuItem value={'kitten'}>Kitten</MenuItem>
                    <MenuItem value={'adult'}>Adult</MenuItem>
                </Select><br></br>
                </FormControl><br></br>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Neutered</InputLabel>
                <Select  labelId="demo-simple-select-label"
                        
                        id="demo-simple-select" value={neutered} label="Neutered" onChange={event => setNeutered(event.target.value)}>
                            
                    <MenuItem value={'neutered'}>Neutered</MenuItem>
                    <MenuItem value={'intact'}>Intact</MenuItem>
                </Select><br></br>
                </FormControl>

           
            <Stack spacing={2} direction="row">
                
                <Button type="submit" variant="contained">Add</Button>
              
            </Stack>
            </form>
            {/* <form onSubmit={handleSubmit}>
                <label> Name:
                    <input type="text"
                        placeholder="name"
                        name="name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </label><br></br>
                <label>Age:
                    <select
                        name="age"
                        value={age}
                        onChange={event => setAge(event.target.value)}
                    >
                        <option value="none">Select from options</option>
                        <option value="kitten">Kitten</option>
                        <option value="adult">Adult</option>
                    </select>
                </label><br></br>
                <label>Neutered?
                    <select
                        name="neuter-status"
                        value={neutered}
                        onChange={event => setNeutered(event.target.value)}
                    >
                        <option value="none">Select from options</option>
                        <option value="neutered">Neutered</option>
                        <option value="intact">Intact</option>
                    </select>
                </label> <br></br>
                <label> Weight:
                    <input type="number"
                        placeholder="weight"
                        name="weight"
                        value={weight}
                        onChange={event => setWeight(event.target.value)}
                    />
                </label><br></br>
                <button type="submit">Add</button>
            </form>
            <button onClick={handleClick}>Back</button> */}


        </div>
    );
}

export default AddCatPage;
