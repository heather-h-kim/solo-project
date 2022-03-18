import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  deleteThisFood(action) {
  console.log('in deleteThisFood saga');
  console.log('action.payload is', action.payload);
  
  try { 
    yield axios.delete(`api/foods/${action.payload}`);
    yield put({type:'FETCH_FOODS'});
    // yield axios.get(`/api/foods/${action.payload.cat_id}`);
  } catch (error) {
    console.log('delete this food request failed', error);
  }
}

function* deleteThisFoodSaga() {
  yield takeEvery('DELETE_THIS_FOOD', deleteThisFood);
}

export default deleteThisFoodSaga;