import { configureStore } from '@reduxjs/toolkit';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Provider } from 'react-redux';
import studentReducer, { deleteStudent } from '../Features/studentSlice';
import StudentsTable from '../Components/students/StudentsTable';

// Helper function to create a store with middleware
const makeTestStore = (preloadedState) => {
  return configureStore({
    reducer: {
      students: studentReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });
};

// Mock deleteStudent async action
jest.mock('../Features/studentSlice', () => {
  const originalModule = jest.requireActual('../Features/studentSlice');
  return {
    ...originalModule,
    deleteStudent: jest.fn((id) => async (dispatch) => {
      dispatch({ type: 'students/deleteStudent/fulfilled', payload: id });
    }),
  };
});

test('deletes a student when delete button is clicked in StudentsTable', async () => {
  const preloadedState = {
    students: {
      students: [
        { _id: '1', firstName: 'John', lastName: 'Doe', parentNumber: '123456789', teacherId: { _id: '2', name: 'Teacher A' } },
        { _id: '2', firstName: 'Jane', lastName: 'Smith', parentNumber: '987654321', teacherId: { _id: '3', name: 'Teacher B' } },
      ],
      loading: false,
      error: null,
      isSuccess: false,
    },
  };

  const store = makeTestStore(preloadedState);

  // Mock `window.confirm`
  window.confirm = jest.fn(() => true);

  render(
    <Provider store={store}>
      <StudentsTable
        students={preloadedState.students.students}
        onEditStudent={jest.fn()}
      />
    </Provider>
  );

  // Verify the initial UI
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Jane Smith')).toBeInTheDocument();

  // Simulate delete button click for John Doe
  const deleteButton = screen.getAllByText('Delete')[0];
  fireEvent.click(deleteButton);

  // Assert `window.confirm` is called
  expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this student?');

  // Assert the correct action is dispatched
  expect(deleteStudent).toHaveBeenCalledWith('1');

  // Restore `window.confirm`
  window.confirm.mockRestore();
});
