import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Header from '../Header/Header';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <Header />
      <div className="container">
        <RegisterForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </button>
        </center>
      </div>
    </div>
  );
}

export default RegisterPage;
