import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  editName(action) {
  console.log('in editName saga');
  console.log('action.payload is', action.payload.name);
  try { 
    yield axios.put(`api/cats/${action.payload.id}`, action.payload);
    yield put({type:'FETCH_CATS'});
  } catch (error) {
    console.log('edit name request failed', error);
  }
}

function* editNameSaga() {
  yield takeEvery('EDIT_NAME', editName);
}

export default editNameSaga;
