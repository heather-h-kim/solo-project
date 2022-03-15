import React from 'react';
import {useHistory} from 'react-router-dom';


function HomeButton() {
    const history = useHistory();

    const handleClick = () => {
        history.push("/home")
    }
  

  return (
    <div className="container">
       <button onClick={handleClick}>Back to Home</button>
      
    </div>
  );
}

export default HomeButton;
