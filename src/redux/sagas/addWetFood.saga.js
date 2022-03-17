import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* addWetFood(action) {
  console.log('in add wet food saga');
  console.log('action.payload is', action.payload);
  try { 
    const response = yield axios.post('api/foods/wet', action.payload);
    console.log('response is', response);
    const catsFoodsObject = {
      cat_id: action.payload.cat_id,
      food_id: response.data[0].id
    }
    console.log('catsFoodsObject is', catsFoodsObject);
    yield axios.post ('api/cats_foods',catsFoodsObject);
    yield axios.put (`api/foods/${catsFoodsObject.food_id}`, catsFoodsObject);

    // yield put({type:'FETCH_FOODS'})
  } catch (error) {
    console.log('add wet food request failed', error);
  }
}

function* addWetFoodSaga() {
  yield takeEvery('ADD_WET_FOOD', addWetFood);
}

export default addWetFoodSaga;
