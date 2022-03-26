// import React from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
// import {useSelector} from 'react-redux';

import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import CatItem from '../CatItem/CatItem';
import LogOutButton from '../LogOutButton/LogOutButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const styles = {
  "&.MuiButton-contained": {
    bgcolor: '#c85c92',
    mt:'30px',
    fontSize:'16px'
  },
};

function UserHomePage() {
  
  const user = useSelector((store) => store.user);

  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const cats = store.cats;

  useEffect( () => {
    dispatch({type:'FETCH_CATS'});
  }, [])

  const handleClick = () =>{
    history.push("/add-cat");
  }
  
  console.log('homepage cats are', cats);



  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>

      <p> Your cats:</p>
      <section style={{paddingLeft:'10px'}}>
        {cats.map((cat,i) => {
          return(<div key={i}>
            <CatItem cat={cat} />
          </div>)
        }
        )}
      </section>
      <p>Click on the cat to get the recommended daily calories!</p>    
      
       
      <Stack direction="row" spacing={2}>
      <Button sx={styles} fullWidth variant="contained" onClick={handleClick}>Add a cat</Button>
    </Stack>
   
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserHomePage;
