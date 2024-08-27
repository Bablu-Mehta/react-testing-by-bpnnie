import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { expect } from "vitest";
import OrderEntry from "../OrderEntry";

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
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopsSubTotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change.", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  //make sure total starts out at $0.00
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  //add cherries  and check total
  const cherriesCheckBox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckBox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  //add hot fudge and check subTotal
  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  //remove hot fudge and check subtotal
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("should grand total starts at $0.00", () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("should update properly if scoop is added first", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand Total: \$/i,
    });

    //update vanilla scoops 2 and check grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    //add cherries and check grand total
    const cherriesCheckBox = await screen.findByRole("checkbox", {
      name:"Cherries",
    });
    await user.click(cherriesCheckBox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  
  test("should update properly if topping is added first", async() => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {name: /Grand Total: \$/});

    //add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole("checkbox", {name:"Cherries"})
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    //update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("should grand total updates properly if item is removed", async() => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    //add cherries
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: "Cherries"
    });
    await user.click(cherriesCheckbox);
    //grand total $1.50

    //update vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByRole("spinbutton", {name:"Vanilla"});
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    //r remove 1 scoop of vanilla and check grand total
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    //check grand total
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("3.50");

    //remove cherries and check grand total
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00")

  });
});
