import setProductsReducer from "../productReducer";
import { SET_PRODUCTS } from "../../actions/productActions";

describe("productReducer", () => {
  const initialState = {
    products: [],
  };

  it("return initial state", () => {
    expect(setProductsReducer(undefined, {})).toEqual(initialState);
  });

  it("working SET_PRODUCTS action", () => {
    const products = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    const action = {
      type: SET_PRODUCTS,
      payload: products,
    };
    const newState = setProductsReducer(initialState, action);
    expect(newState).toEqual([
      ...products
    ]);
  });

  it("not modify the original state", () => {
    const prevState = {
      products: [{ id: 1, name: "Product 1" }],
    };
    const action = {
      type: SET_PRODUCTS,
      payload: [{ id: 2, name: "Product 2" }],
    };
    setProductsReducer(prevState, action);
    expect(prevState).toEqual({
      products: [{ id: 1, name: "Product 1" }],
    });
  });

  it("same state for unknown actions", () => {
    const prevState = {
      products: [{ id: 1, name: "Product 1" }],
    };
    const action = {
      type: "UNKNOWN_ACTION",
      payload: {},
    };
    const newState = setProductsReducer(prevState, action);
    expect(newState).toEqual(prevState);
  });
});
