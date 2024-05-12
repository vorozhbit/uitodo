import { render, screen } from "test-utilities";
import { expect, it, vi } from "vitest";

import Button from "./Button";

it("should render the button and trigger click event", async () => {
  expect.hasAssertions();
  const f = vi.fn();
  const { user } = render(<Button title="Test" onClickHandler={f} />);
  const btn = screen.getByTestId("button");
  expect(btn).toHaveTextContent("Test");

  await user.click(btn);
  expect(f).toHaveBeenCalledOnce();
});
