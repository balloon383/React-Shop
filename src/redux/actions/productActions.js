import { getProducts } from "../../api.js";
import actionCreator from "../utilities/actionCreator.js";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const setProductsAction = (products) => actionCreator(SET_PRODUCTS, products);


export const getProductsThunk = () => {
    return async (dispatch, getState) => {
        await getProducts().then(( data ) =>
          dispatch(setProductsAction(data))
        );
    }
}