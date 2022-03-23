
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import ChartItem from '../ChartItem/ChartItem';


function ChartEachCatPage() {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const cats = store.cats;
  const cat = store.thisCat;
  const weightHistory = store.weightHistory;
  const {id} =useParams();
 

  useEffect( () => {
    dispatch({type:'FETCH_THIS_CAT', payload: Number(id)})
    dispatch({type:'FETCH_WEIGHT_HISTORY', payload: Number(id)})
  }, [])

  const handleClick = () => {
    console.log('in chartEachCatpage handleClick!');
    history.push(`/adjust-calorie/${cat.id}`);
  }
  
  console.log('cat is', cat);
  console.log('weightHistory is', weightHistory);
  return (
    <div className="container">
      
      <table>
        <thead>
          <tr>
            <th>Weight</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {weightHistory.map((weight, i) =>{
            return <tr key={i}>
              <td>{weight.current_weight}</td>
              <td>{weight.new_date}</td>
            </tr>
          })}
        </tbody>
      </table>
      <p>All cats are different! Individual cat's calorie needs can vary by as much as 50% from the calculated values. If you think the recommended daily calorie does not work click the adjust button and make adjustment to the current daily calories.</p>
      <button onClick={handleClick}>Adjust</button>
      
    </div>
  );
}

export default ChartEachCatPage;
