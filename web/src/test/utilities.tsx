import { render as renderComponent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { TodoContext } from "../context/TodoContext";
import { TodoContextType } from "../types";

type RenderOptions = Parameters<typeof renderComponent>[1];

const customRender = (ui: ReactElement, options?: RenderOptions) => {
  return {
    ...renderComponent(ui, options),
    user: userEvent.setup(),
  };
};

export const renderWithTodoContext = (
  ui: ReactElement,
  {
    providerProps,
    ...renderOptions
  }: {
    providerProps: TodoContextType;
  },
) => {
  return {
    ...renderComponent(
      <TodoContext.Provider value={{ ...providerProps }}>
        {ui}
      </TodoContext.Provider>,
      renderOptions,
    ),
    user: userEvent.setup(),
  };
};

export * from "@testing-library/react";
export { customRender as render };
