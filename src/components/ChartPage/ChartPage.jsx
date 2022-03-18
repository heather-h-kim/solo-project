
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import ChartItem from '../ChartItem/ChartItem';


function ChartPage() {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const cats = store.cats;
  const weightHistory = store.weightHistory

  useEffect( () => {
    dispatch({type:'FETCH_CATS'});
  }, [])

  const handleClick = () => {
    console.log('in chartpage handleClick!');
    history.push('/adjust-calorie');
  }
  
  console.log('cats are', cats);
  console.log('weightHistory is', weightHistory);
  return (
    <div className="container">
      <p> Your cats:</p>
      <section>
        {cats.map((cat,i) => {
          return(<div key={i}>
            <ChartItem cat={cat} />
          </div>)
        }
        )}
      <p>Click on the cat to see the weight history!</p>    
      </section>
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
              <td>{weight.date}</td>
            </tr>
          })}
        </tbody>
      </table>
      <p>All cats are different! Individual cat's calorie needs can vary by as much as 50% from the calculated values. If you think the recommended daily calorie does not work click the adjust button and make adjustment to the current daily calories.</p>
      <button onClick={handleClick}>Adjust</button>
      
    </div>
  );
}

export default ChartPage;
