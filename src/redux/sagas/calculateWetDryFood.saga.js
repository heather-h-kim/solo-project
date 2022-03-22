import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  calculateWetDryFood(action) {
  console.log('in calculateFoodAmount saga');
  console.log('action.payload is', action.payload);
  const wetFood = {
      cat_id: action.payload.cat_id,
      food_id: action.payload.wetFood_id
  }

  const dryFood = {
      cat_id: action.payload.cat_id,
      food_id: action.payload.dryFood_id
  }
  
  const foodsNotToDelete = {
    cat_id: action.payload.cat_id,
    wetFood_id: action.payload.wetFood_id,
    dryFood_id: action.payload.dryFood_id
}
  
  try { 
    yield axios.put(`/api/cats_foods/${action.payload.cat_id}`, wetFood);
    yield axios.put(`/api/cats_foods/${action.payload.cat_id}`, dryFood);
    yield axios.delete (`/api/cats_foods/${action.payload.cat_id}`, {data: {cat_id: action.payload.cat_id, wetFood_id:action.payload.wetFood_id, dryFood_id: action.payload.dryFood_id }});
    yield put({type:'FETCH_FOODS', payload: action.payload.cat_id});
  } catch (error) {
    console.log('calculate calorie request failed', error);
  }
}

function* calculateWetDryFoodSaga() {
  yield takeEvery('CALCULATE_WET_DRY_AMOUNT', calculateWetDryFood);
}

export default calculateWetDryFoodSaga;
