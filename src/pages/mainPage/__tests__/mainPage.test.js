import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { MainPage } from "../MainPage";

const mockStore = configureMockStore([thunk]);

describe("MainPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: [
        { id: 1, category: "Category 1" },
        { id: 3, category: "Category 2" },
      ],
    });
  });

  test("renders categories", () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    const category1Title = screen.getByText("Category 1");
    const category2Title = screen.getByText("Category 2");

    expect(category1Title).toBeInTheDocument();
    expect(category2Title).toBeInTheDocument();
  });

  
});
