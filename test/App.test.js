import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import App from "../App";

describe("App Component Tests", () => {
  test("renders App component", () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    expect(getByText("React Native TODO")).toBeTruthy();
    expect(getByPlaceholderText("Enter task")).toBeTruthy();
  });

  test("handles adding a new task", () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    // Input a task
    const input = getByPlaceholderText("Enter task");
    fireEvent.changeText(input, "New Test Task");

    // Press the "Add" button
    const addButton = getByText("Add");
    fireEvent.press(addButton);

    // Check if the new task is added
    expect(getByText("New Test Task")).toBeTruthy();
  });

  test("handles editing a task", () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    // Input a task
    const input = getByPlaceholderText("Enter task");
    fireEvent.changeText(input, "New Test Task");

    // Press the "Add" button
    const addButton = getByText("Add");
    fireEvent.press(addButton);

    // Edit the task
    const editButton = getByText("Update");
    fireEvent.press(editButton);

    // Check if the task is updated
    expect(getByText("New Test Task")).toBeTruthy();
  });

  test("handles deleting a task", () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<App />);

    // Input a task
    const input = getByPlaceholderText("Enter task");
    fireEvent.changeText(input, "New Test Task");

    // Press the "Add" button
    const addButton = getByText("Add");
    fireEvent.press(addButton);

    // Delete the task
    const deleteButton = getByText("Delete");
    fireEvent.press(deleteButton);

    // Check if the task is deleted
    expect(queryByText("New Test Task")).toBeNull();
  });
});
