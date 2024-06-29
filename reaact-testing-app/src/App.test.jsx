import { render, screen } from "@testing-library/react";
// import { logRoles } from "@testing-library/dom";
import App from "./App";

test("button starts with correct color and text.", () => {
  const {container} = render(<App />);

  // logRoles(container); it gives present the roles in the dom 

  const buttonElement = screen.getByRole("button", { name: /blue/i });
  expect(buttonElement).toHaveClass("red");
});

test("button has correct color after click.", () => {});

test("button has correct text after click.", () => {});
