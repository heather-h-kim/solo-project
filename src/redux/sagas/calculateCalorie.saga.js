import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  calculateCalorie(action) {
  console.log('in calculateCalorie saga');
  console.log('action.payload is', action.payload);
  
  try { 
    yield axios.put(`api/cats/calorie/${action.payload.id}`, action.payload);
    yield axios.put(`api/cats/treats/${action.payload.id}`, action.payload);
    yield put({type:'FETCH_CATS'});
    yield put({type:'FETCH_THIS_CAT', payload: action.payload.id});
  } catch (error) {
    console.log('calculate calorie request failed', error);
  }
}

function* calculateCalorieSaga() {
  yield takeEvery('CALCULATE_CALORIE', calculateCalorie);
}

export default calculateCalorieSaga;
