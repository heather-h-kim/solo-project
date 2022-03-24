import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FoodToDelete from '../FoodToDelete/FoodToDelete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function EditCatPage() {
  const store = useSelector((store) => store);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [neutered, setNeutered] = useState('');
  const [weight, setWeight] = useState('');
  const dispatch = useDispatch();
  const cat = store.thisCat;
  const foods = store.foods;
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_THIS_CAT', payload: Number(id) });
    dispatch({ type: 'FETCH_FOODS', payload: Number(id) });
  }, []);


  const editName = () => {
    const confirmation = confirm("Are you sure?")
    if (confirmation === true) {
      dispatch({ type: 'EDIT_NAME', payload: { id: cat.id, name: name } })
      setName('');
      alert('Success!')
    }
  }

  const editAge = () => {
    const confirmation = confirm("Are you sure?")
    if (confirmation === true) {
      dispatch({ type: 'EDIT_AGE', payload: { id: cat.id, age: age } });
      setAge('');
      alert('Success!')
    }
  }

  const editNeuterStatus = () => {
    const confirmation = confirm("Are you sure?")
    if (confirmation === true) {
      dispatch({ type: 'EDIT_NEUTER_STATUS', payload: { id: cat.id, is_neutered: neutered } });
      setNeutered('');
      alert('Success!')
    }
  }

  const editWeight = () => {
    const confirmation = confirm("Are you sure?")
    if (confirmation === true) {
      dispatch({ type: 'EDIT_WEIGHT', payload: { id: cat.id, current_weight: weight } })
      setWeight('');
      alert('Success!')
    }
  }

  const handleClick = () => {
    history.push(`/cat-info/${cat.id}`)
  }




  return (
    <div className="container">
      <p>Edit info</p>
      <FormControl fullWidth>
        <TextField label="name" variant="outlined" value={name} onChange={event => setName(event.target.value)}
          InputProps={{ endAdornment: <Button onClick={editName} variant="contained">Edit</Button> }} /> <br></br>
        <TextField label="weight" variant="outlined" value={weight} onChange={event => setWeight(event.target.value)}
          InputProps={{ endAdornment: <Button onClick={editWeight} variant="contained">Edit</Button> }} /> <br></br>
      </FormControl>
      <Box sx={{ display: 'flex' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select" value={age} label="Age" onChange={event => setAge(event.target.value)}>
            <MenuItem value={'kitten'}>Kitten</MenuItem>
            <MenuItem value={'adult'}>Adult</MenuItem>
          </Select><br></br>
        </FormControl><br></br>
        <Box>
          <Button sx={{ mt: 1, ml: 1 }} onClick={editAge} variant="contained">Edit</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Neuter status</InputLabel>
          <Select sx={{ p: 0 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select" value={neutered} label="Neuter-status" onChange={event => setNeutered(event.target.value)}>
            <MenuItem value={'neutered'}>Neutered</MenuItem>
            <MenuItem value={'intact'}>Intact</MenuItem>
          </Select><br></br>
        </FormControl>

        <Button sx={{ mb: 3, ml: 1 }} onClick={editNeuterStatus} variant="contained">Edit</Button>

      </Box>
      <table>
        <thead>
          <th>Food name</th>
          <th> </th>
        </thead>
        <tbody>
          {foods.map((food, i) => (
            <tr key={i}>
              <FoodToDelete food={food} />
            </tr>
          ))}
        </tbody>
      </table>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleClick}>Back to your cat</Button>
      </Stack>
    </div>
  );
}

export default EditCatPage;
