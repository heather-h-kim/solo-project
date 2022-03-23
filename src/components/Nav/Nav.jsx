import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">

      <Link to="/landing">
        <h2 className="nav-title">Kitty Weight Watcher</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user-home">
              Home
            </Link>
            {/* <Link className="navLink" to="/home">
              Home
            </Link> */}

            <Link className="navLink" to="/chart">
              Chart
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

      </div>
     </div>
     
  );
}

export default Nav;
