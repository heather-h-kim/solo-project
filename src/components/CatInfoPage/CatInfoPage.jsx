import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import FoodItem from '../FoodItem/FoodItem';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const styles = {
  "&.MuiButton-contained": {
    bgcolor: '#c85c92',
    mt:'20px',
    fontSize:'16px'
  },
};

function CatInfoPage() {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const cat = store.thisCat;
  const foods = store.foods;
  const {id} =useParams();
  console.log('id is', id);

  useEffect( () => {
    dispatch({type:'FETCH_THIS_CAT', payload: Number(id)});
    dispatch({type:'FETCH_FOODS', payload: Number(id)});
  }, []);

  const sendToEditInfo = () => {
    history.push(`/edit-cat/${id}`)
  }

  const sendToWeightInputPage = () => {
      history.push(`/weight-input/${id}`);
  }
  
  const sendToHome = () => {
    history.push('/user-home');
  }
  
  return (
    <div className="container">
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#ffe6ee', mb:'20px' }}>
        <List>
          <ListItem sx={{fontSize:"20px", mt:"10px", mb:"4px"}} disablePadding>
          Name: {cat.name}
          </ListItem>
          <ListItem sx={{fontSize:"20px", mb:"4px"}}disablePadding>
          Age: {cat.age}
          </ListItem>
          <ListItem sx={{fontSize:"20px", mb:"4px"}}disablePadding>
          Neuter-status: {cat.is_neutered}
          </ListItem>
          <ListItem sx={{fontSize:"20px", mb:"15px"}}disablePadding>
          Current weight: {cat.current_weight}lbs
          </ListItem>
        </List>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350, bgcolor: 'rgb(255, 230, 255, 0.4)'}}>
        <TableHead>
          <TableRow >
            <TableCell align="center" sx={{width:'200px', fontSize:"21px"}}>Food</TableCell>
            <TableCell align="center" sx={{width:'250px', fontSize:"21px"}}>Daily amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.map((food, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <FoodItem food={food}/>
              
            </TableRow>
          ))}
        </TableBody> 
      </Table>
    </TableContainer><br></br>
       
    <Stack spacing={2} direction="row">
      <Button sx={styles} onClick={sendToEditInfo} variant="contained">Edit</Button>
      <Button sx={styles} onClick={sendToWeightInputPage} variant="contained">Get the daily calorie!</Button>
      <Button sx={styles} onClick={sendToHome} variant="contained">Back</Button>
    </Stack>

      
    </div>
  );
}

export default CatInfoPage;
