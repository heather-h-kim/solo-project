import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  editWeight(action) {
  console.log('in editWeight saga');
  try { 
    yield axios.put(`api/cats/${action.payload.id}`, action.payload);
    yield axios.post('api/weight', action.payload)
    yield put({type:'FETCH_CATS'});
  } catch (error) {
    console.log('edit weight request failed', error);
  }
}

function* editWeightSaga() {
  yield takeEvery('EDIT_WEIGHT', editWeight);
}

export default editWeightSaga;
