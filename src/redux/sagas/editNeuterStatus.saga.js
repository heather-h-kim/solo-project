import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  editNeuterStatus(action) {
  console.log('in editNeuterStatus saga');
  try { 
    yield axios.put(`api/cats/${action.payload.id}`, action.payload);
    yield put({type:'FETCH_CATS'});
  } catch (error) {
    console.log('edit neuter status request failed', error);
  }
}

function* editNeuterStatusSaga() {
  yield takeEvery('EDIT_NEUTER_STATUS', editNeuterStatus);
}

export default editNeuterStatusSaga;