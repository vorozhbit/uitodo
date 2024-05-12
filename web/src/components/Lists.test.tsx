import { renderWithTodoContext, screen } from "test-utilities";
import { expect, it, vi } from "vitest";
import { StaticRouter } from "react-router-dom/server";

import Lists from "./Lists";
import { TodoContextType } from "../types";
import { generateId } from "../services/utils";

vi.mock("../services/api", async (importOriginal) => {
  const actual = (await importOriginal()) as {};
  return {
    ...actual,
    createNewList: vi.fn().mockReturnValue(true),
  };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as {};
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

it("should add list", async () => {
  expect.hasAssertions();

  const f = vi.fn();
  const providerProps = {
    list: {},
    lists: [],
    setLists: f,
  } as unknown as TodoContextType;

  const { user } = renderWithTodoContext(
    <StaticRouter location>
      <Lists />
    </StaticRouter>,
    { providerProps },
  );

  const input = screen.getByTestId<HTMLInputElement>("input");

  await user.type(input, "Test{enter}");
  expect(f).toHaveBeenCalledTimes(1);
});

it("should remove list", async () => {
  expect.hasAssertions();

  const f = vi.fn();
  const providerProps = {
    list: {},
    lists: [{ title: "Demo List", id: generateId() }],
    setLists: f,
  } as unknown as TodoContextType;

  const { user } = renderWithTodoContext(
    <StaticRouter location>
      <Lists />
    </StaticRouter>,
    { providerProps },
  );

  const deleteBtn = screen.getByTestId("remove");
  const list = screen.getByText("Demo List");
  expect(list).toBeInTheDocument();

  await user.click(deleteBtn);
  expect(f).toHaveBeenCalledTimes(1);
});
