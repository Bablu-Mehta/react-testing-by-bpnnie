import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";

import { render, screen } from "@testing-library/react";
import OrderEntery from "../OrderEntery";
import { expect } from "vitest";

test("should handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderEntery />);

  const alerts = await screen.findAllByRole("alert", {
    name: "An unexpected error occurred. Please try again later.",
  });

  expect(alerts).toHaveLength(2);
  
});
