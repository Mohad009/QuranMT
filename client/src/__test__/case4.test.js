import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import userReducer, { logout } from "../Features/UserSlice";
import Sidebar from "../Components/SideBar";
import "@testing-library/jest-dom";

// Helper function to create a store
const makeTestStore = (preloadedState) => {
  return configureStore({
    reducer: {
      users: userReducer,
    },
    preloadedState,
  });
};

test("logs out the user when the logout button is clicked", () => {
  const preloadedState = {
    users: {
      isLogin: true,
      user: { _id: "1", name: "John Doe", phone: "123456789", utype: "admin" },
    },
  };

  const store = makeTestStore(preloadedState);

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>
  );

  // Ensure the user information is displayed
  expect(screen.getByText("John Doe")).toBeInTheDocument();

  // Open the profile dropdown
  fireEvent.click(screen.getByRole("button", { name: /j/i })); // 'J' is the first letter of "John Doe"

  // Click the logout button
  fireEvent.click(screen.getByRole("menuitem", { name: /logout/i }));

  // Check if the `logout` action was dispatched
  const actions = store.getActions();
  expect(actions).toContainEqual(logout());

  // Navigation to login page can be validated if necessary by checking the URL
  // MemoryRouter will reset to root ("/") after logout
});
