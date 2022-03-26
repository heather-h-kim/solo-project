import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
 
      <div className="container bg"> 
      <header>Kitty Weight Watcher</header>
        <RegisterForm />
        <center>
          <h4 style={{marginTop: '120px'}}>Already a Member?</h4>
          <button className="btn btn_sizeSm" onClick={onLogin}>
            Login
          </button>
        </center>
       
      </div> 
  
  );
}

export default LandingPage;
