
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ChartItem from '../ChartItem/ChartItem';
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
import { FormControl } from '@mui/material';


function ChartEachCatPage() {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const cats = store.cats;
  const cat = store.thisCat;
  const weightHistory = store.weightHistory;
  const { id } = useParams();


  useEffect(() => {
    dispatch({ type: 'FETCH_THIS_CAT', payload: Number(id) })
    dispatch({ type: 'FETCH_WEIGHT_HISTORY', payload: Number(id) })
  }, [])

  const handleClick = () => {
    console.log('in chartEachCatpage handleClick!');
    history.push(`/adjust-calorie/${cat.id}`);
  }

  console.log('cat is', cat);
  console.log('weightHistory is', weightHistory);
  return (
    <div className="container">
      <FormControl >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell align="center" sx={{ fontSize: "20px" }}>Weight</TableCell>
              <TableCell align="center" sx={{ fontSize: "20px" }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weightHistory.map((weight, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" sx={{ fontSize: "20px" }}>{weight.current_weight}lbs</TableCell>
                <TableCell align="center" sx={{ fontSize: "20px" }}>{weight.new_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer><br></br>
     
      <p>All cats are different! Individual cat's calorie needs can vary by as much as 50% from the calculated values. If you think the recommended daily calorie does not work click the adjust button and make adjustment to the current daily calories.</p>
      <Button sx={{mt:2}} variant="contained" onClick={handleClick}>Adjust</Button>
      </FormControl>
    </div>
  );
}

export default ChartEachCatPage;
