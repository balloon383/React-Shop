import setUserReducer from "../userReducer";
import { SET_USER } from "../../actions/userActions";

describe("setUserReducer", () => {
  const initialState = {
      id: "",
      status: false,
      name: "",
      shoppingCart: [],
      orders: [],
  };

  it("check SET_USER action", () => {
    const user = {
      id: "123",
      status: true,
      name: "Anton",
      shoppingCart: [
        { id: 1, count: 2 },
        { id: 2, count: 1 },
      ],
      orders: [
        { id: 3, count: 3 },
        { id: 4, count: 1 },
      ],
    };
    const action = {
      type: SET_USER,
      payload: user,
    };
    const newState = setUserReducer(initialState, action);
    expect(newState).toEqual({
        id: "123",
        status: true,
        name: "Anton",
        shoppingCart: [
          { id: 1, count: 2 },
          { id: 2, count: 1 },
        ],
        orders: [
          { id: 3, count: 3 },
          { id: 4, count: 1 },
        ],
    });
  });

  it("not modifying original state", () => {
    const prevState = {
      id: "123",
      status: true,
      name: "Tom",
      shoppingCart: [
        { id: 1, count: 2 },
        { id: 2, count: 1 },
      ],
      orders: [
        { id: 3, count: 3 },
        { id: 4, count: 1 },
      ],
    };
    const action = {
      type: SET_USER,
      payload: {
        id: "456",
        status: false,
        name: "Tom",
        shoppingCart: [{ id: 5, count: 1 }],
        orders: [{ id: 6, count: 2 }],
      },
    };
    setUserReducer(prevState, action);
    expect(prevState).toEqual({
      id: "123",
      status: true,
      name: "Tom",
      shoppingCart: [
        { id: 1, count: 2 },
        { id: 2, count: 1 },
      ],
      orders: [
        { id: 3, count: 3 },
        { id: 4, count: 1 },
      ],
    });
  });

  it("return same state for unknown actions", () => {
    const prevState = {
        id: "123",
        status: true,
        name: "Anton",
        shoppingCart: [
          { id: 1, count: 2 },
          { id: 2, count: 1 },
        ],
        orders: [
          { id: 3, count: 3 },
          { id: 4, count: 1 },
        ],
    };
    const action = {
      type: "UNKNOWN_ACTION",
      payload: {},
    };
    const newState = setUserReducer(prevState, action);
    expect(newState).toEqual(prevState);
  });
});
