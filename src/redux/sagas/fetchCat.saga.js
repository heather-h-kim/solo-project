import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// will be fired on 'ADD_CAT' action
function* fetchCats( ) {
  console.log('in fetchCats saga');
  try { 
    const cats = yield axios.get('api/cats');
    console.log('cats are', cats.data);
    yield put({type:'SET_CATS', payload: cats.data});

  } catch (error) {
    console.log('add cat request failed', error);
  }
}

function* fetchCatsSaga() {
  yield takeEvery('FETCH_CATS', fetchCats);
}

export default fetchCatsSaga;