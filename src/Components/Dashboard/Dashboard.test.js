import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../app/authSlice.ts'; // Assuming you have a rootReducer file
import Dashboard from '.';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Dashboard', () => {
  it('renders Dashboard component', () => {
    const store = createStore(rootReducer);

    render(
      <Provider store={store}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Dashboard: Secured Route')).toBeInTheDocument();
  });

  it('logs out successfully', () => {
    const store = createStore(rootReducer);

    render(
      <Provider store={store}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});