const weightReducer = (state = [], action) => {
    console.log('in weightReducer');
    
    switch (action.type) {
      case 'SET_WEIGHT_HISTORY':
        return action.payload;
      default:
        return state;
    }
  };
  export default weightReducer;