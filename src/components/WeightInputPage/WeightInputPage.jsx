import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';


function WeightInputPage() {
  const store = useSelector((store) => store);
  const cat = store.thisCat;
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [goal, setGoal] = useState('');
  const [dCal, setDCal] = useState(cat.total_daily_cal);

  
  console.log('dailyCalories is', dCal);

  useEffect( () => {
    dispatch({type:'FETCH_THIS_CAT', payload: id});
  }, []);
 
  const calculateCalorie = () => {
    console.log('calculate!');
    console.log('goal is', goal);
    const goalWeight = {
      id: cat.id,
      goal_weight: Number(goal)
    }
    console.log('goalWeight is', goalWeight);
    dispatch({type:'CALCULATE_CALORIE', payload: goalWeight })
    setGoal('');
  }

  const sendToTreats = () => {
    console.log('sending the user to TreatsPage');
    history.push(`/treats/${cat.id}`)
  }
  console.log('this cat is', cat);
  return (
    <div className="container">
        <p>How many calories does {cat.name} need per day to reach the goal weight?</p>
        <form onSubmit={calculateCalorie}>
        <label>Goal weight:
          <input type="number"
                 placeholder="goal weight"
                 value={goal}
                 onChange={event => setGoal(event.target.value)}
                 />
        </label><br></br>
        <button type="submit">Calculate</button>
        </form>
       <p>goal weight: {cat.goal_weight} <br></br>daily calorie: {cat.total_daily_cal}</p>
        
       <button onClick={sendToTreats}>Next</button>
    </div>
  );
}

export default WeightInputPage;
