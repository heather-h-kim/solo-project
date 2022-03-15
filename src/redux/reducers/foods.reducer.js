const foodsReducer = (state = [], action) => {
    console.log('in foodsReducer');
    switch (action.type) {
      case 'SET_FOODS':
        return action.payload;
      default:
        return state;
    }
  };
  export default foodsReducer;