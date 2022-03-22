import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* addWetUpdateDry(action) {
  
  try { 
    console.log('in add Dry update Wet saga');
    console.log('action.payload is', action.payload);

    const wetFood = {
        cat_id: action.payload.cat_id,
        name: action.payload.wet_name,
        type: 'wet',
        cal_per_can: action.payload.cal_per_can,
        cal_per_kg: action.payload.wet_cal_per_kg
    }

    const responseWet = yield axios.post('api/foods/dry', dryFood);
    console.log('responseDry is', responseWet);
    const wetFoodId = responseWet.data[0].id;

    console.log('wetFoodId is', wetFoodId);


    const wetFoodObject = {
        cat_id: action.payload.cat_id,
        food_id: wetFoodId
    }

    const dryFoodObject = {
        cat_id:action.payload.cat_id,
        food_id: action.payload.dryFood_id
    }
    
    const foodsNotToDelete = {
        cat_id: action.payload.cat_id,
        wetFood_id: wetFoodId,
        dryFood_id: action.payload.dryFood_id,
    }

    yield axios.post ('api/cats_foods',wetFoodObject);
    
    
    yield put({type:'CALCULATE_FOOD_AMOUNT', payload: wetFoodObject});
    yield put({type:'CALCULATE_FOOD_AMOUNT', payload: dryFoodObject});
    
    yield axios.delete (`api/cats_foods/${action.payload.cat_id}`, {data: {cat_id: action.payload.cat_id, wetFood_id: wetFoodId, dryFood_id: action.payload.dryFood_id }});
    
  } catch (error) {
    console.log('add wet food update dry food request failed', error);
  }
}

function* addWetUpdateDrySaga() {
  yield takeEvery('ADD_WET_FOOD_AND_UPDATE_DRY_FOOD', addWetUpdateDry);
}

export default addWetUpdateDrySaga;
