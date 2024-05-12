import { render, screen, fireEvent } from "test-utilities";
import { expect, it, vi } from "vitest";

import Input from "./Input";

it("should render the input", async () => {
  expect.hasAssertions();

  render(<Input name="test" placeholder="type" />);
  const input = screen.getByTestId<HTMLInputElement>("input");
  expect(input.name).toBe("test");
  expect(input.placeholder).toBe("type");
});

it("should trigger events", async () => {
  expect.hasAssertions();

  const testValue = "test value";

  const f = vi.fn();
  f.mockImplementation((e) => {
    expect(e.target.value).toBe(testValue);
  });

  render(
    <Input
      name="test"
      onChangeHandler={f}
      onKeyDownHandler={f}
      onBlurHandler={f}
    />,
  );
  const input = screen.getByTestId<HTMLInputElement>("input");

  fireEvent.change(input, { target: { value: testValue } });
  expect(input.value).toBe(testValue);

  expect(f).toHaveBeenCalledTimes(1);

  fireEvent.keyDown(input, {
    key: "Enter",
  });

  expect(f).toHaveBeenCalledTimes(2);

  fireEvent.blur(input);

  expect(f).toHaveBeenCalledTimes(3);
});
