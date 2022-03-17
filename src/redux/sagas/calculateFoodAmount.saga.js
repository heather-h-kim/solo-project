import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  calculateFoodAmount(action) {
  console.log('in calculateFoodAmount saga');
  console.log('action.payload is', action.payload);
  
  
  try { 
    yield axios.put('api/foods/', action.payload);
    // yield put({type:'FETCH_CATS'});
    // yield put({type:'FETCH_THIS_CAT', payload: action.payload.id});
  } catch (error) {
    console.log('calculate calorie request failed', error);
  }
}

function* calculateFoodAmountSaga() {
  yield takeEvery('CALCULATE_FOOD_AMOUNT', calculateFoodAmount);
}

export default calculateFoodAmountSaga;
