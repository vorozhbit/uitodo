import { renderWithTodoContext, screen } from "test-utilities";
import { expect, it, vi } from "vitest";

import ListTitle from "./ListTitle";
import { TodoContextType } from "../types";
import { Socket } from "socket.io-client";

it("should render list title", async () => {
  expect.hasAssertions();

  const providerProps = {
    list: { title: "Demo" },
  } as TodoContextType;

  renderWithTodoContext(<ListTitle socket={null} />, { providerProps });

  const input = screen.getByTestId<HTMLInputElement>("input");
  expect(input.value).toBe("Demo");
});

it("should update title", async () => {
  expect.hasAssertions();
  const f = vi.fn();
  const socket = vi.fn();

  const providerProps = {
    list: { title: "Demo" },
    updateList: () =>
      new Promise((resolve) => {
        resolve(true);
      }),
    updateListInLists: f,
  } as unknown as TodoContextType;

  const { user } = renderWithTodoContext(
    <ListTitle socket={{ emit: socket } as unknown as Socket} />,
    {
      providerProps,
    },
  );

  const input = screen.getByTestId<HTMLInputElement>("input");
  await user.type(input, "test{enter}");

  expect(f).toHaveBeenCalledOnce();
  expect(socket).toHaveBeenCalledOnce();
});
