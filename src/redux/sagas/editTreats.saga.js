import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  editTreats(action) {
  console.log('in editTreats saga', action.payload);

  try { 
    yield axios.put(`api/cats/treats/${action.payload.id}`, action.payload);
    yield put({type:'FETCH_CATS'});
    yield put({type:'FETCH_THIS_CAT', payload: action.payload.id});
  } catch (error) {
    console.log('edit treats request failed', error);
  }
}

function* editTreatsSaga() {
  yield takeEvery('EDIT_TREATS', editTreats);
}

export default editTreatsSaga;