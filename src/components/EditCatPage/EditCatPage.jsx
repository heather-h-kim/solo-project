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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const styles = {
  "&.MuiTextField-root": {
    bgcolor: "#ffffff",
    marginTop: '15px'
  },
  "&.MuiButton-contained": {
    bgcolor: '#c85c92',
    fontSize:'16px',
  },
};



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
      <FormControl fullWidth>
        <TextField sx={styles} label="name" variant="outlined" value={name} onChange={event => setName(event.target.value)}
          InputProps={{ endAdornment: <Button sx={styles} onClick={editName} variant="contained">Edit</Button> }} /> <br></br>
        <TextField sx={styles} label="weight" variant="outlined" value={weight} onChange={event => setWeight(event.target.value)}
          InputProps={{ endAdornment: <Button sx={styles} onClick={editWeight} variant="contained">Edit</Button> }} /> <br></br>
      </FormControl>
      <Box sx={{ display: 'flex' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            sx={{bgcolor:'#ffffff'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select" value={age} label="Age" onChange={event => setAge(event.target.value)}>
            <MenuItem value={'kitten'}>Kitten</MenuItem>
            <MenuItem value={'adult'}>Adult</MenuItem>
          </Select><br></br>
        </FormControl><br></br>
        <Box>
          <Button sx={{ mt: 1, ml: 1, bgcolor:'#c85c92' }} onClick={editAge} variant="contained">Edit</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Neuter status</InputLabel>
          <Select sx={{bgcolor:'#ffffff'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select" value={neutered} label="Neuter-status" onChange={event => setNeutered(event.target.value)}>
            <MenuItem value={'neutered'}>Neutered</MenuItem>
            <MenuItem value={'intact'}>Intact</MenuItem>
          </Select><br></br>
        </FormControl>

        <Button sx={{ mb: 3, ml: 1, bgcolor:'#c85c92' }} onClick={editNeuterStatus} variant="contained">Edit</Button>

      </Box>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350, bgcolor: '#ffffff' }} >
        <TableHead>
          <TableRow >
            <TableCell align="left" sx={{width:'300px', fontSize:"21px"}}>Food</TableCell>
            <TableCell align="center" sx={{width:'100px', fontSize:"21px"}}> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.map((food, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <FoodToDelete food={food}/>
              
            </TableRow>
          ))}
        </TableBody> 
      </Table>
    </TableContainer><br></br>

        <Button sx={styles} fullWidth variant="contained" onClick={handleClick}>Back to your cat</Button>
      
    </div>
  );
}

export default EditCatPage;
