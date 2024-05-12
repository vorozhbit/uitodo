import { render, screen } from "test-utilities";
import { expect, it, vi } from "vitest";

import ListAddForm from "./ListAddForm";

const errorMessage = "Enter at least 2 letters";

it("should render the form", async () => {
  expect.hasAssertions();

  const f = vi.fn();
  render(
    <ListAddForm
      title="Test"
      buttonTitle="Add"
      name="text"
      onFormSubmitHandler={f}
    />,
  );

  const wrp = screen.getByTestId("list-form-wrapper");
  const input = screen.getByTestId<HTMLInputElement>("input");
  expect(wrp).toHaveTextContent("Test");

  expect(screen.getByRole("button")).toHaveTextContent("Add");
  expect(input.name).toBe("text");
});

it("should validate input and submit value", async () => {
  expect.hasAssertions();

  const f = vi.fn();
  const { user } = render(
    <ListAddForm
      title="Test"
      buttonTitle="Add"
      name="text"
      onFormSubmitHandler={f}
    />,
  );

  const wrp = screen.getByTestId("list-form-wrapper");
  const input = screen.getByTestId<HTMLInputElement>("input");
  const btn = screen.getByRole("button");

  await user.click(btn);

  expect(wrp).toHaveTextContent(errorMessage);
  expect(f).not.toHaveBeenCalled();

  await user.type(input, "a");
  await user.click(btn);

  expect(wrp).toHaveTextContent(errorMessage);
  expect(f).not.toHaveBeenCalled();

  await user.type(input, "aa");
  await user.click(btn);

  expect(wrp).not.toHaveTextContent(errorMessage);
  expect(f).toHaveBeenCalled();
});

it("should submit value on enter", async () => {
  expect.hasAssertions();

  const f = vi.fn();
  const { user } = render(
    <ListAddForm
      title="Test"
      buttonTitle="Add"
      name="text"
      onFormSubmitHandler={f}
    />,
  );

  const wrp = screen.getByTestId("list-form-wrapper");
  const input = screen.getByTestId<HTMLInputElement>("input");

  await user.type(input, "test{enter}");

  expect(wrp).not.toHaveTextContent(errorMessage);
  expect(f).toHaveBeenCalledTimes(1);
});
