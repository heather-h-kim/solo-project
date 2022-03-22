import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  calculateFoodAmount(action) {
  console.log('in calculateFoodAmount saga');
  console.log('action.payload is', action.payload);
  
  
  try { 
    yield axios.put(`api/cats_foods/${action.payload.cat_id}`, action.payload);
    yield axios.delete (`api/cats_foods/oneFood/${action.payload.cat_id}`, {data: {cat_id: action.payload.cat_id, food_id: action.payload.food_id}});
    yield put({type:'FETCH_FOODS', payload: action.payload.cat_id});
  } catch (error) {
    console.log('calculate calorie request failed', error);
  }
}

function* calculateFoodAmountSaga() {
  yield takeEvery('CALCULATE_FOOD_AMOUNT', calculateFoodAmount);
}

export default calculateFoodAmountSaga;
