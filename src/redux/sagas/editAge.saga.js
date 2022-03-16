import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  editAge(action) {
  console.log('in editName saga');
  try { 
    yield axios.put(`api/cats/${action.payload.id}`, action.payload);
    yield put({type:'FETCH_CATS'});
  } catch (error) {
    console.log('edit age request failed', error);
  }
}

function* editAgeSaga() {
  yield takeEvery('EDIT_AGE', editAge);
}

export default editAgeSaga;