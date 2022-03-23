import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  adjustCalorie(action) {
  console.log('in adjustCalorie saga');
  console.log('action.payload is', action.payload);
  
  try { 
    yield axios.put(`/api/cats/adj-calorie/${action.payload.cat_id}`, action.payload);
    yield put({type:'FETCH_CATS'});
    yield put({type:'FETCH_THIS_CAT', payload: action.payload.cat_id});
  } catch (error) {
    console.log('adjust calorie request failed', error);
  }
}

function* adjustCalorieSaga() {
  yield takeEvery('ADJUST_CALORIE', adjustCalorie);
}

export default adjustCalorieSaga;
