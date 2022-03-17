import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* addWetFood(action) {
  console.log('in add wet food saga');
  console.log('action.payload is', action.payload);
  try { 
    yield axios.post('api/foods/wet', action.payload);
    // yield put({type:'FETCH_FOODS'})
  } catch (error) {
    console.log('add wet food request failed', error);
  }
}

function* addWetFoodSaga() {
  yield takeEvery('ADD_WET_FOOD', addWetFood);
}

export default addWetFoodSaga;
