import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import cats from './cats.reducer';
import foods from './foods.reducer';
import thisCat from './thisCat.reducer';
import weightHistory from './weight.reducer';
import userFoods from './userFoods.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  cats, // contains all cats of one user
  foods, // contains all foods of a cat
  thisCat, // contains info on a cat
  weightHistory, //contains weight history of a cat
  userFoods, //contains foods that one user has
});

export default rootReducer;
