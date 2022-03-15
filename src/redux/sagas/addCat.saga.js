import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// will be fired on 'ADD_CAT' action
function* addCat(action) {
  console.log('in addCat saga');
  console.log('action.payload is', action.payload);
  try { 
    yield axios.post('api/cats', action.payload);
    
  } catch (error) {
    console.log('add cat request failed', error);
  }
}

function* addCatSaga() {
  yield takeEvery('ADD_CAT', addCat);
}

export default addCatSaga;