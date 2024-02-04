import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import Authenticate from '.';
import { Provider } from 'react-redux';

const mockStore = createStore(() => ({ user: {} }));

describe('Authenticate component', () => {
  it('renders the login form', () => {
    render(
      <Provider store={mockStore}>
      <MemoryRouter initialEntries={['/login']}>
        <Authenticate type="login" />
      </MemoryRouter>
      </Provider>
    );

    // Add your test code here
  })

  it('renders the register form', () => {
    render(
      <Provider store={mockStore}>
      <MemoryRouter initialEntries={['/register']}>
        <Authenticate type="register" />
      </MemoryRouter>
      </Provider>
    );
  });
});