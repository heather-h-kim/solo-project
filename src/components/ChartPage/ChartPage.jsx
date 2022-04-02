import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
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

  console.log('cats are', cats);
  console.log('weightHistory is', weightHistory);
  return (
    <div className="container">
      <p> Your cats:</p>
      <section style={{marginTop:'20px', marginBottom:'30px'}}>
        {cats.map((cat,i) => {
          return(<div key={i}>
            <ChartItem cat={cat} />
          </div>)
        }
        )}
      </section>
      <p>Click on the cat to see the weight history!</p>    
    
      
    </div>
  );
}

export default ChartPage;
