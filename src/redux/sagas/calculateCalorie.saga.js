import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  calculateCalorie(action) {
  console.log('in calculateCalorie saga');
  console.log('action.payload is', action.payload.name);
  try { 
    yield axios.put(`api/cats/${action.payload.id}`, action.payload);
    yield put({type:'FETCH_CATS'});
  } catch (error) {
    console.log('edit weight request failed', error);
  }
}

function* editWeightSaga() {
  yield takeEvery('EDIT_WEIGHT', editWeight);
}

export default editWeightSaga;
