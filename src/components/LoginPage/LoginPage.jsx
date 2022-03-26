import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <div className="container bg">
      <header>Kitty Weight Watcher</header>
        <LoginForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/registration');
            }}
            style={{marginTop: '100px'}}
          >
            Register
          </button>
        </center>
      </div>
    </div>
  );
}

export default LoginPage;
