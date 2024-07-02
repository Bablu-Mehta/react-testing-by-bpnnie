import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../summary/SummaryForm";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

test("should check initial conditions", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("should checkbox enables button on first click and disables on second click.", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async()=>{
  const user = userEvent.setup();

  //popover starts out hidden

  //popover appears on mouseover of checkbox label

  //popover disappear when mouse out
})