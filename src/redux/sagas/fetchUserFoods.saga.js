import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchUserFoods(action) {
  console.log('in fetchUserFoods saga');
  console.log('action.payload is', action.payload);
  try { 
    const userFoods = yield axios.get(`/api/foods/user/${req.user.id}`);
    console.log('userFoods are', userFoods.data);

    yield put({type:'SET_USER_FOODS', payload: userFoods.data});

  } catch (error) {
    console.log('fetch user food request failed', error);
  }
}

function* fetchUserFoodsSaga() {
  yield takeEvery('FETCH_USER_FOODS', fetchUserFoods);
}

export default fetchUserFoodsSaga;