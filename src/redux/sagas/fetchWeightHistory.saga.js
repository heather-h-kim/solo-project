import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchWeightHistory(action) {
  console.log('in fetchWeightHistory saga');
  
  try { 
    const weightHistory = yield axios.get(`/api/weight/${action.payload}`);
    console.log('weight history is', weightHistory.data);
    yield put({type:'SET_WEIGHT_HISTORY', payload: weightHistory.data});

  } catch (error) {
    console.log('fetch weight history request failed', error);
  }
}

function* fetchWeightHistorySaga() {
  yield takeEvery('FETCH_WEIGHT_HISTORY', fetchWeightHistory);
}

export default fetchWeightHistorySaga;