import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import FoodItem from '../FoodItem/FoodItem';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function CatInfoPage() {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Home Page');
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


  console.log('this cat is', cat);
  const sendToEditInfo = () => {
    history.push(`/edit-cat/${id}`)
  }

  const sendToWeightInputPage = () => {
      history.push(`/weight-input/${id}`);
  }
  
  const sendToHome = () => {
    history.push('/user-home');
  }
  console.log('foods are', foods);
  return (
    <div className="container">
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
     
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
          Current weight: {cat.current_weight}
          </ListItem>
        </List>
       
      </nav>
    </Box>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align="center" sx={{width:'100px', fontSize:"21px"}}>Food</TableCell>
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
      <Button onClick={sendToEditInfo} variant="contained">Edit</Button>
      <Button onClick={sendToWeightInputPage} variant="contained">Get the daily calorie!</Button>
      <Button onClick={sendToHome} variant="contained">Back</Button>
    </Stack>

      
    </div>
  );
}

export default CatInfoPage;
