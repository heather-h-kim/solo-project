import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* addWetUpdateDry(action) {
  console.log('in add Dry update Wet saga');
  console.log('action.payload is', action.payload);
  try { 
    const foods = {
      wet_food: {
        cat_id: action.payload.cat_id,
        name: action.payload.wet_name,
        type: 'wet',
        cal_per_can: action.payload.cal_per_can,
        cal_per_kg: action.payload.wet_cal_per_kg
      },
      dry_food: {
        food_id: action.payload.dryFood_id
      }
    }

    yield axios.post('/api/cats_foods/new-wet-old-dry', foods);
    yield put({type:'FETCH_FOODS', payload: action.payload.cat_id});

   
  } catch (error) {
    console.log('add wet food update dry food request failed', error);
  }
}

function* addWetUpdateDrySaga() {
  yield takeEvery('ADD_WET_FOOD_AND_UPDATE_DRY_FOOD', addWetUpdateDry);
}

export default addWetUpdateDrySaga;
