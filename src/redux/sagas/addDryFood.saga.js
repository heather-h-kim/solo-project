import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* addDryFood(action) {
  console.log('in add dry food saga');
  console.log('action.payload is', action.payload);
  try { 
    //update the wetfood_percentage to 0
    yield axios.put(`/api/cats/wetRatio/${action.payload.cat_id}`, action.payload);

    //post the new dry food and get the new food's id
    const response = yield axios.post('/api/foods/dry', action.payload);
    console.log('response is', response);
    const foodId = response.data[0].id;
    const catsFoodsObject = {
      cat_id: action.payload.cat_id,
      food_id: foodId
    }
    console.log('catsFoodsObject is', catsFoodsObject);
    //post the new dry food on the cats_foods table
    yield axios.post ('/api/cats_foods',catsFoodsObject);
    //calculate(update) the daily food amount columns on the cats_foods table
    yield axios.put(`/api/cats_foods/${catsFoodsObject.cat_id}`, catsFoodsObject);
    //delete the cats_foods row that has not been updated
    yield axios.delete (`/api/cats_foods/oneFood/${action.payload.cat_id}`, {data: {cat_id: action.payload.cat_id, food_id: foodId}});
    yield put({type:'FETCH_FOODS', payload: action.payload.cat_id});
  } catch (error) {
    console.log('add dry food request failed', error);
  }
}

function* addDryFoodSaga() {
  yield takeEvery('ADD_DRY_FOOD', addDryFood);
}

export default addDryFoodSaga;
