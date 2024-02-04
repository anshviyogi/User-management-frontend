import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Authenticate from ".";

const mockStore = configureStore([]);

describe("Authenticate component", () => {
  let store;
  let history;

  beforeEach(() => {
    store = mockStore({
      auth: {
        userDetails: null,
      },
    });

    history = createMemoryHistory();
  });

  it("renders register form by default", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Authenticate type="register" />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
  });

  it("renders login form when type is login", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Authenticate type="login" />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("First Name")).toBeNull();
    expect(screen.queryByPlaceholderText("Last Name")).toBeNull();
  });

  it("dispatches setUserDetails action on successful login", async () => {
    store = mockStore({
      auth: {
        userDetails: null,
      },
    });

    const login = jest.fn();
    store.dispatch = login;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Authenticate type="login" />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("Login"));

    expect(login).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "password",
    });
  });

  it("navigates to dashboard on successful login", async () => {
    history.push = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Authenticate type="login" />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("Login"));

    expect(history.push).toHaveBeenCalledWith("/dashboard");
  });

  it("displays error toast on failed login", async () => {
    const toast = jest.fn();
    global.toast = toast;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Authenticate type="login" />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("Login"));

    expect(toast).toHaveBeenCalledWith("Failed to login");
  });
})