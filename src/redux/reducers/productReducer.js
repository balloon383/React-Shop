import { SET_PRODUCTS } from '../actions/productActions'
const INITIAL_STATE = {
  products: []
};

const setProductsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.payload];

    default:
      return state;
  }
    
};

export default setProductsReducer