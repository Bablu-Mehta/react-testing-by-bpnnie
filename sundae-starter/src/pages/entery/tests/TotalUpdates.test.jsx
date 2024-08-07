import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { expect } from "vitest";

test("should update scoop subtotal when scoops changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out at $0.00
  const scoopsSubTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubTotal).toHaveTextContent("0.00");

  //update vanilla scoop to 1, and check the subTotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopsSubTotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2 check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {name:'Chocolate'});

  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');

  expect(scoopsSubTotal).toHaveTextContent('6.00');
});
