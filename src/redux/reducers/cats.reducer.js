const catsReducer = (state = [], action) => {
    console.log('in catsReducer');
    
    switch (action.type) {
      case 'SET_CATS':
        return action.payload;
      default:
        return state;
    }
  };
  export default catsReducer;
  