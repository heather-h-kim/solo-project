import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import CatItem from '../CatItem/CatItem';
import LogOutButton from '../LogOutButton/LogOutButton';

function HomePage({cat}) {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Home Page');
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
      <h2>{heading}</h2>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <p> Your cats:</p>
      <section>
        {cats.map((cat,i) => {
          return(<div key={i}>
            <CatItem cat={cat} />
          </div>)
        }
        )}
      <p>Click on the cat to get recommended daily calorie!</p>    
      </section>
       
      
      <button onClick={handleClick}>Add Cat</button>
    </div>
  );
}

export default HomePage;
