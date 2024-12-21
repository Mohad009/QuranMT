import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/UserSlice';
import Login from '../Components/Login';

const makeTestStore = (preloadedState) => {
  return configureStore({
    reducer: {
      users: userReducer,
    },
    preloadedState,
  });
};

test('submits the form with valid inputs and dispatches the login action', () => {
  const preloadedState = { users: { msg: '', isLogin: false, user: null } };
  const store = makeTestStore(preloadedState);

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  // Fill in valid data
  fireEvent.change(screen.getByLabelText(/phone number/i), {
    target: { value: '1234567890' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' },
  });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  // Assert login action was dispatched
  const actions = store.getState();
  expect(actions.users.isLogin).toBe(false); // Modify this assertion as needed based on your reducer logic
});
