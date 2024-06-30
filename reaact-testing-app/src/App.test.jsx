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

  //clicking the checkbox and check for disabled button in dom
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("grey");

  //clicking the checkbox again and checking for enabled button in the dom.
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("red");
});

test("checkbox flow after the button has been clicked", ()=>{
  render(<App />);

  //find elements
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  //click the button
  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveClass("blue");

  //click the check box to disable the button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("grey");

  //click the button to enable the button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("blue");

})