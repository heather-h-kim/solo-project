import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';


function WeightInputPage() {
  const store = useSelector((store) => store);
  const cat = store.thisCat;
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [goalWeight, setGoalWeight] = useState('');
  const [treat, setTreat] = useState('');
  const [clicked, setClicked] = useState(false)



  useEffect( () => {
    dispatch({type:'FETCH_THIS_CAT', payload: Number(id)});
  }, []);
 
  //calculate recommended daily calories based on the user input(goal weight and treat%)
  const calculateCalorie = () => {
    console.log('calculate!');
    console.log('goalWeight is', goalWeight);
    console.log('treat is', treat);
    const goal = {
      id: cat.id,
      goal_weight: Number(goalWeight),
      treat_percentage: Number(treat)
    }
    console.log('goal is', goal);
    dispatch({type:'CALCULATE_CALORIE', payload: goal })
    setGoalWeight('');
    setTreat('');
    setClicked(!clicked)
    
  }

  const sendToFoodAmount = () => {
    console.log('sending the user to FoodAmountPage');
    history.push(`/food-amount/${cat.id}`)
  }
  
  return (
    <div className="container">
        <p>How many calories does {cat.name} need per day to reach the goal weight?</p>
        <form onSubmit={calculateCalorie}>
        Goal weight:
          <input type="number"
                 placeholder="goal weight"
                 value={goalWeight}
                 onChange={event => setGoalWeight(event.target.value)}
                 />
        <br></br>
        <p>How much treats do you want to feed {cat.name}? It is recommended that you limit treats up to 10% of the daily calorie needs.</p>
        Desired % of the daily calories from treats:
          <input type="number"
                 placeholder="treat %"
                 value={treat}
                 onChange={event => setTreat(event.target.value)} 
                 /> %
        <br></br>
        <button type="submit">Calculate</button>
        </form>
        {clicked && 
      <div>
        <ul>
         <li>goal weight: {cat.goal_weight}lbs</li>
         <li>treat %: {cat.treat_percentage}%</li>
         <li>recommended daily calories: {cat.total_daily_cal}kcal</li>
         <li>recommended calories from treats: {cat.treat_cal}kcal</li>
         <li>recommended calories from foods: {cat.food_cal}kcal</li>
       </ul><br></br>
       <button onClick={sendToFoodAmount}>Next</button>
      </div>
}
    </div>
  );
}

export default WeightInputPage;
