import { render, screen } from "test-utilities";
import { expect, it, vi } from "vitest";

import Checkbox from "./Checkbox";

it("should render the checkbox and trigger change event", async () => {
  expect.hasAssertions();

  const f = vi.fn();
  const { user } = render(
    <Checkbox name="test" checked={false} onChangeHandler={f} />,
  );
  const checkbox = screen.getByTestId("checkbox");
  const label = screen.getByTestId("label");

  await user.click(label);

  expect(checkbox).toBeChecked();

  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();

  expect(f).toHaveBeenCalledTimes(2);
});
