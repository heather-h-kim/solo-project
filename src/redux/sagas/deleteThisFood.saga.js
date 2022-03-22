import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function*  deleteThisFood(action) {
  console.log('in deleteThisFood saga');
  console.log('action.payload is', action.payload);
  
  try { 
    yield axios.delete(`/api/cats_foods/edit/${action.payload.food_id}`, {data: {cat_id: action.payload.cat_id, food_id: action.payload.food_id}});
    yield put({type:'FETCH_FOODS', payload: action.payload.cat_id});
    // yield axios.get(`/api/foods/${action.payload.cat_id}`);
  } catch (error) {
    console.log('delete this food request failed', error);
  }
}

function* deleteThisFoodSaga() {
  yield takeEvery('DELETE_THIS_FOOD', deleteThisFood);
}

export default deleteThisFoodSaga;