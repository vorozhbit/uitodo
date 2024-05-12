import { renderWithTodoContext, screen } from "test-utilities";
import { expect, it, vi } from "vitest";
import { StaticRouter } from "react-router-dom/server";

import List from "./List";
import { TodoContextType } from "../types";
import { generateId } from "../services/utils";

const listId = generateId();

it("should render list with items", async () => {
  expect.hasAssertions();

  const f = vi.fn();
  const providerProps = {
    list: { title: "Main List" },
    lists: [],
    items: [
      { id: generateId(), text: "Item1", completed: false, listId },
      { id: generateId(), text: "Item2", completed: true, listId },
    ],
    setLists: f,
  } as unknown as TodoContextType;

  renderWithTodoContext(
    <StaticRouter location>
      <List id={listId} />
    </StaticRouter>,
    { providerProps },
  );

  const listTitle = screen.getByDisplayValue("Main List");
  const i1 = screen.getByDisplayValue("Item1");
  const i2 = screen.getByDisplayValue("Item2");

  expect(listTitle).toBeInTheDocument();
  expect(i1).toBeInTheDocument();
  expect(i2).toBeInTheDocument();
});

it("should group items by completion", async () => {
  expect.hasAssertions();

  const f = vi.fn();
  const providerProps = {
    list: { title: "Main List" },
    lists: [],
    items: [
      { id: generateId(), text: "Item1", completed: false, listId },
      { id: generateId(), text: "Item2", completed: true, listId },
    ],
    updateListInLists: f,
  } as unknown as TodoContextType;

  const { user } = renderWithTodoContext(
    <StaticRouter location>
      <List id={listId} />
    </StaticRouter>,
    { providerProps },
  );

  const toggle = screen.getByTestId("toggle-grouping-by-completion");
  expect(toggle).toHaveTextContent("Order by Status");

  await user.click(toggle);
  expect(toggle).toHaveTextContent("Default order");

  expect(screen.getByTestId("completed-wrapper")).toBeInTheDocument();
  expect(screen.getByText("Completed")).toBeInTheDocument();
});
