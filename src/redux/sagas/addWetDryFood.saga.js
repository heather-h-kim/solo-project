import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* addWetDryFood(action) {
  
  try { 
    console.log('in add wet and dry food saga');
    console.log('action.payload is', action.payload);
    const wetFood = {
        cat_id: action.payload.cat_id,
        name: action.payload.wet_name,
        type: 'wet',
        cal_per_can: action.payload.cal_per_can,
        cal_per_kg: action.payload.wet_cal_per_kg
    }

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

    const responseWet = yield axios.post('api/foods/wet', wetFood);
    console.log('responseWet is', responseWet);
    const wetFoodId = responseWet.data[0].id;

    console.log('wetFoodId is', wetFoodId);
    console.log('dryFoodId is', dryFoodId);

    const wetFoodObject = {
        cat_id: action.payload.cat_id,
        food_id: wetFoodId
    }

    const dryFoodObject = {
        cat_id: action.payload.cat_id,
        food_id: dryFoodId
    }
    
    const foodsNotToDelete = {
        cat_id: action.payload.cat_id,
        wetFood_id: wetFoodId,
        dryFood_id: dryFoodId
    }

    yield axios.post ('api/cats_foods',wetFoodObject);
    yield axios.post ('api/cats_foods',dryFoodObject);
    
    
    yield put({type:'CALCULATE_FOOD_AMOUNT', payload: wetFoodObject});
    yield put({type:'CALCULATE_FOOD_AMOUNT', payload: dryFoodObject});
    
    yield axios.delete (`api/cats_foods/${action.payload.cat_id}`, {data: {cat_id: action.payload.cat_id, wetFood_id: wetFoodId, dryFood_id: dryFoodId}});

  } catch (error) {
    console.log('add dry food request failed', error);
  }
}

function* addWetDryFoodSaga() {
  yield takeEvery('ADD_WET_DRY_FOOD', addWetDryFood);
}

export default addWetDryFoodSaga;
