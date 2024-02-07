import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import App from "../App";

describe("App Component Tests", () => {
  test("renders App component", async () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    expect(getByText("React Native TODO")).toBeTruthy();
    expect(getByPlaceholderText("Enter task")).toBeTruthy();
  });

  test("handles adding a new task", async () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    // Input  task
    const input = getByPlaceholderText("Enter task");
    fireEvent.changeText(input, "New Test Task");

    // Press the "Add" button
    const addButton = getByText("Add");
    fireEvent.press(addButton);

    // Wait for the asynchronous fetchTasks to complete
    await waitFor(() => expect(getByText("New Test Task")).toBeTruthy());
  });

  test("handles editing a task", async () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    // Input a task
    const input = getByPlaceholderText("Enter task");
    fireEvent.changeText(input, "New Test Task");

    // Press the "Add" button
    const addButton = getByText("Add");
    fireEvent.press(addButton);

    // Wait for the asynchronous fetchTasks to complete
    await waitFor(() => expect(getByText("New Test Task")).toBeTruthy());

    // Edit the task
    const editButton = getByText("Edit");
    fireEvent.press(editButton);

    // Wait for the "Update" button to appear
    await waitFor(() => expect(getByText("Update")).toBeTruthy());

    // Check if the task is updated
    expect(getByText("New Test Task")).toBeTruthy();
  });

  test("handles deleting a task", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<App />);

    // Input a task
    const input = getByPlaceholderText("Enter task");
    fireEvent.changeText(input, "New Test Task");

    // Press the "Add" button
    const addButton = getByText("Add");
    fireEvent.press(addButton);

    // Wait for the asynchronous fetchTasks to complete
    await waitFor(() => expect(getByText("New Test Task")).toBeTruthy());

    // Delete the task
    const deleteButton = getByText("Delete");
    fireEvent.press(deleteButton);

    // Check if the task is deleted
    expect(queryByText("New Test Task")).toBeNull();
  });
});
