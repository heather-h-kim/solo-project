import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* addWetDryFood(action) {
  
  try { 
    console.log('in add wet and dry food saga');
    console.log('action.payload is', action.payload);
 
    const wetAndDry = {
      wet_food: {
        cat_id: action.payload.cat_id,
        name: action.payload.wet_name,
        type: 'wet',
        cal_per_can: action.payload.cal_per_can,
        cal_per_kg: action.payload.wet_cal_per_kg
      },
      dry_food: {
        cat_id: action.payload.cat_id,
        name: action.payload.dry_name,
        type: 'dry',
        cal_per_cup: action.payload.cal_per_cup,
        cal_per_kg: action.payload.dry_cal_per_kg }
      }
    console.log('wetAndDry is', wetAndDry);
    yield axios.post ('api/cats_foods/wet-and-dry', wetAndDry);
    yield put({type:'FETCH_FOODS', payload: action.payload.cat_id});
  } catch (error) {
    console.log('add dry food request failed', error);
  }
}

function* addWetDryFoodSaga() {
  yield takeEvery('ADD_WET_DRY_FOOD', addWetDryFood);
}

export default addWetDryFoodSaga;
