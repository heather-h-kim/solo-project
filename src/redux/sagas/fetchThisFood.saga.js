import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// will be fired on 'ADD_CAT' action
function* fetchThisFood(action) {
  console.log('in fetchThisFood saga');
  console.log('id is', action.payload);
  try { 
    const cat = yield axios.get(`/api/cats/${action.payload}`);
    console.log('this cat is', cat.data);
    
    yield put({type:'SET_THIS_CAT', payload: cat.data});
  } catch (error) {
    console.log('fetch this cat request failed', error);
  }
}

function* fetchThisCatSaga() {
  yield takeEvery('FETCH_THIS_CAT', fetchThisCat);
}

export default fetchThisCatSaga;