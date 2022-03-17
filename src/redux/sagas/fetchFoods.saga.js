import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchFoods( ) {
  console.log('in fetchCats saga');
  try { 
    const foods = yield axios.get('/api/foods');
    console.log('foods are', foods.data);
    yield put({type:'SET_FOODS', payload: foods.data});

  } catch (error) {
    console.log('fetch food request failed', error);
  }
}

function* fetchFoodsSaga() {
  yield takeEvery('FETCH_FOODS', fetchFoods);
}

export default fetchFoodsSaga;