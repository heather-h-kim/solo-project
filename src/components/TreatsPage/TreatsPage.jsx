import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';


function TreatsPage(props) {
  const store = useSelector((store) => store);
  const cat = store.thisCat;
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [treat, setTreat] = useState('');
  
  useEffect( () => {
    dispatch({type:'FETCH_THIS_CAT', payload: id});
  }, []);

  const handleSubmit = () => {
    console.log('in treats page ');
    const treatPercent = {
      id: cat.id,
      treat_percentage: Number(treat)
    };
    console.log('treatPercent is', treatPercent);
    dispatch({type: 'EDIT_TREATS', payload: treatPercent});
    setTreat('');
  }
  const handleClick = () => {
    console.log('sending the user to FoodAmountPage');
    history.push(`/food-amount/${cat.id}`)
  }
  return (
    <div className="container">
      <h3>Do you give {cat.name} treats?</h3>
      <p>It is recommended that you limit treats up to 10% of the daily calorie needs.</p>
      <form onSubmit={handleSubmit}>
        <label>Desired % of the daily calories from treats:
          <input type="number"
                 placeholder="treat %"
                 value={treat}
                 onChange={event => setTreat(event.target.value)} 
                 /> %
        </label><br></br>
        <button type="submit">Submit</button>
      </form>
      <p>The calories from treats are {cat.treat_cal}!</p>
      <button onClick={handleClick}>Next</button>
    </div>
  );
}

export default TreatsPage;
