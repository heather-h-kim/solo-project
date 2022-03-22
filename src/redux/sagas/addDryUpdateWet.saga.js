import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* addDryUpdateWet(action) {
  
  try { 
    console.log('in add Dry update Wet saga');
    console.log('action.payload is', action.payload);

    const dryFood = {
        cat_id: action.payload.cat_id,
        name: action.payload.dry_name,
        type: 'dry',
        cal_per_cup: action.payload.cal_per_cup,
        cal_per_kg: action.payload.dry_cal_per_kg
    }

    const responseDry = yield axios.post('api/foods/dry', dryFood);
    console.log('responseDry is', responseDry);
    const dryFoodId = responseDry.data[0].id;

    console.log('dryFoodId is', dryFoodId);


    const dryFoodObject = {
        cat_id: action.payload.cat_id,
        food_id: dryFoodId
    }

    const wetFoodObject = {
        cat_id:action.payload.cat_id,
        food_id: action.payload.wetFood_id
    }
    
    const foodsNotToDelete = {
        cat_id: action.payload.cat_id,
        wetFood_id: action.payload.wetFood_id,
        dryFood_id: dryFoodId
    }

    yield axios.post ('api/cats_foods',dryFoodObject);
    
    
    yield put({type:'CALCULATE_FOOD_AMOUNT', payload: dryFoodObject});
    yield put({type:'CALCULATE_FOOD_AMOUNT', payload: wetFoodObject});
    
    yield axios.delete (`api/cats_foods/${action.payload.cat_id}`, {data: {cat_id: action.payload.cat_id, wetFood_id:action.payload.wetFood_id, dryFood_id: dryFoodId }});
    
  } catch (error) {
    console.log('add dry food update wet food request failed', error);
  }
}

function* addDryUpdateWetSaga() {
  yield takeEvery('ADD_DRY_FOOD_AND_UPDATE_WET_FOOD', addDryUpdateWet);
}

export default addDryUpdateWetSaga;
