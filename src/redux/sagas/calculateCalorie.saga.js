import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  calculateCalorie(action) {
  console.log('in calculateCalorie saga');
  console.log('action.payload is', action.payload);
  
  try { 
    yield axios.put(`api/calories/${action.payload.id}`, action.payload);
    yield put({type:'FETCH_CATS'});
  } catch (error) {
    console.log('calculate calorie request failed', error);
  }
}

function* calculateCalorieSaga() {
  yield takeEvery('CALCULATE_CALORIE', calculateCalorie);
}

export default calculateCalorieSaga;
