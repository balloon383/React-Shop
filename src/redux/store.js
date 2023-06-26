import { configureStore, combineReducers } from "@reduxjs/toolkit"
import setProductsReducer from "./reducers/productReducer";
import setUserReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  products: setProductsReducer,
  user: setUserReducer
})

export default configureStore({
  reducer: rootReducer,
});