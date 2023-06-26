import { getUsers } from "../../api";
import actionCreator from "../utilities/actionCreator";
export const SET_USER = "SET_USER";
export const GET_USERS = "GET_USERS"
export const REGISTER_USER = "REGISTER_USER";
export const SET_METHOD = "SET_METHOD";
export const SET_CART = "SET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";


export const setUserAction = (user) => actionCreator(SET_USER, user);
export const setUserMethodAction = (method) => actionCreator(SET_METHOD, method);
export const setUsersAction = (users) => actionCreator(GET_USERS, users);
export const setShoppingCartAction = (shoppingCart) => actionCreator(SET_CART, shoppingCart);


export const getUsersThunk = () => {
  return async (dispatch, getState) => {
    await getUsers().then((data) => dispatch(setUsersAction(data)));
  };
};

export const getUserThunk = (id) => {
  return async (dispatch, getState) => {
    await getUsers(id).then((data) => dispatch(setUserAction(data)));
  };
}; 
