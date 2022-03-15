const thisCatReducer = (state = {}, action) => {
    console.log('in thisCatReducer');
    switch (action.type) {
      case 'SET_THIS_CAT':
        return action.payload[0];
      default:
        return state;
    }
  };
  export default thisCatReducer;
  