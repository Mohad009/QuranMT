import { configureStore } from '@reduxjs/toolkit';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Provider } from 'react-redux';
import userReducer from "../Features/UserSlice"
import ManageUsers from '../Components/users/ManageUsers'; 

// Helper function to create a store
const makeTestStore = (preloadedState) => {
  return configureStore({
    reducer: {
      users: userReducer, // Replace with your actual reducers
    },
    preloadedState,
  });
};

// Test Case 3: Ensure ManageUsers filters users correctly
test('filters users by search term', () => {
    const preloadedState = {
      users: {
        users: [
          { _id: '1', name: 'John Doe', PNumber: '12345678', utype: 'teacher', isActive: true },
          { _id: '2', name: 'Jane Smith', PNumber: '87654321', utype: 'parent', isActive: false },
        ],
      },
    };
    const store = makeTestStore(preloadedState);
  
    render(
      <Provider store={store}>
        <ManageUsers />
      </Provider>
    );
  
    fireEvent.change(screen.getByPlaceholderText('Search users...'), {
      target: { value: 'John' },
    });
  
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });
  