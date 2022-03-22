const userFoodsReducer = (state = [], action) => {
    console.log('in userFoodsReducer');
    switch (action.type) {
      case 'SET_USER_FOODS':
        return action.payload;
      default:
        return state;
    }
  };
  export default userFoodsReducer;