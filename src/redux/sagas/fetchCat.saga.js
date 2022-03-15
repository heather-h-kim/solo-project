import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// will be fired on 'ADD_CAT' action
function* fetchCats( ) {
  console.log('in fetchCats saga');
  try { 
    const cats = yield axios.get('api/cat');
    yield put({type:'SET_CATS', payload: cats.data});

  } catch (error) {
    console.log('add cat request failed', error);
  }
}

function* addCatSaga() {
  yield takeEvery('ADD_CAT', addCat);
}

export default addCatSaga;