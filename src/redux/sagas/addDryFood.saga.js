import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// will be fired on 'ADD_CAT' action
function* addDryFood(action) {
  console.log('in add dry food saga');
  console.log('action.payload is', action.payload);
  try { 
    yield axios.post('api/foods/dry', action.payload);
    yield put({type:'FETCH_CATS'})
  } catch (error) {
    console.log('add cat request failed', error);
  }
}

function* addCatSaga() {
  yield takeEvery('ADD_CAT', addCat);
}

export default addCatSaga;
