import { render, screen, fireEvent } from "@testing-library/react";
// import { logRoles } from "@testing-library/dom";
import App from "./App";
import { expect } from "vitest";

test("button click flow.", () => {
  //render the App
  const { container } = render(<App />);

  // logRoles(container); it gives present the roles in the dom
  //find the button
  const buttonElement = screen.getByRole("button", { name: /blue/i });

  //check the initial color
  expect(buttonElement).toHaveClass("red");

  //click the button
  fireEvent.click(buttonElement);

  //check the button text.
  expect(buttonElement).toHaveTextContent(/red/i);

  //check the button color.
  expect(buttonElement).toHaveClass("blue");
});

test("checkbox flow", () => {
  render(<App />);

  //find elements
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  //checkbox initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();
});
