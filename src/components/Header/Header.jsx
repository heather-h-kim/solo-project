import React, { useState } from 'react';
import './Header.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function Header() {
  const [heading, setHeading] = useState('Kitty Weight Watcher');

 

  return (
    <div className="container">
      <header>
      <h1>{heading}</h1>
      </header>
    </div>
  );
}

export default Header;
