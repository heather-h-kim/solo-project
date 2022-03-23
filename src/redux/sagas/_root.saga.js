import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import addCatSaga from './addCat.saga';
import fetchCatsSaga from './fetchCats.saga';
import fetchThisCatSaga from './fetchThisCat.saga';
import editNameSaga from './editName.saga';
import editAgeSaga from './editAge.saga';
import editNeuterStatusSaga from './editNeuterStatus.saga';
import editWeightSaga from './editWeight.saga';
import calculateCalorieSaga from './calculateCalorie.saga';
import editTreatsSaga from './editTreats.saga';
import editWetFoodRatioSaga from './editWetFoodRatio.saga';
import addDryFoodSaga from './addDryFood.saga';
import addWetFoodSaga from './addWetFood.saga';
import fetchFoodsSaga from './fetchFoods.saga';
import calculateFoodAmountSaga from './calculateFoodAmount.saga';
import fetchWeightHistorySaga from './fetchWeightHistory.saga';
import deleteThisFoodSaga from './deleteThisFood.saga';
import addWetDryFoodSaga from './addWetDryFood.saga';
import addDryUpdateWetSaga from './addDryUpdateWet.saga'; 
import addWetUpdateDrySaga from './addWetUpdateDry.saga'; 
import calculateWetDryFoodSaga from './calculateWetDryFood.saga';
import adjustCalorieSaga from './adjustCalorie.saga';



// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    addCatSaga(),
    fetchCatsSaga(),
    fetchThisCatSaga(),
    editNameSaga(),
    editAgeSaga(),
    editNeuterStatusSaga(),
    editWeightSaga(),
    calculateCalorieSaga(),
    editTreatsSaga(),
    editWetFoodRatioSaga(),
    addDryFoodSaga(),
    addWetFoodSaga(),
    fetchFoodsSaga(),
    calculateFoodAmountSaga(),
    fetchWeightHistorySaga(),
    deleteThisFoodSaga(),
    addWetDryFoodSaga(),
    addDryUpdateWetSaga(),
    addWetUpdateDrySaga(),
    calculateWetDryFoodSaga(),
    adjustCalorieSaga(),
  ]);
}
