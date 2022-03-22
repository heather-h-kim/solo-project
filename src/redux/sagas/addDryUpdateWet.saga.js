import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* addDryUpdateWet(action) {
  console.log('in add Dry update Wet saga');
  console.log('action.payload is', action.payload);

  try {
    const foods = {
      dry_food: {
        cat_id: action.payload.cat_id,
        name: action.payload.dry_name,
        type: 'dry',
        cal_per_cup: action.payload.cal_per_cup,
        cal_per_kg: action.payload.dry_cal_per_kg
      },
      wet_food: {
        food_id: action.payload.wetFood_id
      }
    }
  
    yield axios.post('/api/cats_foods/new-dry-old-wet', foods);
    yield put({type:'FETCH_FOODS', payload: action.payload.cat_id});

 
} catch (error) {
  console.log('add dry food update wet food request failed', error);
}
}

function* addDryUpdateWetSaga() {
  yield takeEvery('ADD_DRY_FOOD_AND_UPDATE_WET_FOOD', addDryUpdateWet);
}

export default addDryUpdateWetSaga;
