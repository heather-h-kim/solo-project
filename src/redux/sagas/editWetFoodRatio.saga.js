import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  editWetFoodRatio(action) {
  console.log('in edit wet food ratio saga');
  try { 
    yield axios.put(`/api/cats/wetRatio/${action.payload.id}`, action.payload);
    yield put({type:'FETCH_CATS'});
  } catch (error) {
    console.log('edit weight request failed', error);
  }
}

function* editWetFoodRatioSaga() {
  yield takeEvery('EDIT_WET_PERCENTAGE', editWetFoodRatio);
}

export default editWetFoodRatioSaga;
