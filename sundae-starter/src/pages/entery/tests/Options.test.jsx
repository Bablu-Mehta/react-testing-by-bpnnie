import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import { expect } from "vitest";

test("should displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of the images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("should displays image for each toppings option from server", async () => {
  //Mock Service Worker will return three toppings from server
  render(<Options optionType="toppings" />);
  //find images, expect 3 based on what msw returns
  const images = await screen.findAllByRole("img", { name: /topping$/i });
  expect(images).toHaveLength(3);

  //check the equal alt text for images
  const imageTitle = images.map((img) => img.alt);
  expect(imageTitle).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
