import { Provider } from "react-redux";
import Dashboard from ".";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import React from "react";

const mockStore = createStore(() => ({ user: {} }));

describe("Dashboard Component", () => {
  it("renders the dashboard page", () => {
    <Provider store={mockStore}>
      <Dashboard />
    </Provider>;
  });
});
