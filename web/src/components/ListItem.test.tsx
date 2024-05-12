import { render, screen, waitFor } from "test-utilities";
import { expect, it, vi } from "vitest";

import ListItem from "./ListItem";
import { TodoItemUpdate } from "../types";
import { Socket } from "socket.io-client";

it("should update and delete item", async () => {
  expect.hasAssertions();
  const upd = vi.fn();
  const del = vi.fn();
  const socket = vi.fn();

  const { user } = render(
    <ListItem
      item={{ text: "Demo" } as TodoItemUpdate}
      onUpdateHandle={upd}
      onDeleteHandle={del}
      socket={{ emit: socket } as unknown as Socket}
    />,
  );

  const input = screen.getByTestId<HTMLInputElement>("input");
  const deleteBtn = screen.getByTestId("remove");
  const label = screen.getByTestId("label");

  await user.click(label);
  expect(upd).toHaveBeenCalledTimes(1);

  await user.type(input, "test{enter}");
  expect(upd).toHaveBeenCalledTimes(2);

  await waitFor(() => expect(socket).toHaveBeenCalledTimes(1));

  await user.click(deleteBtn);
  expect(del).toHaveBeenCalledOnce();
});
