import { TodoHeader } from "@/components/TodoHeader";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("<TodoHeader/>", () => {
  // Temporary workaround for https://github.com/vitest-dev/vitest/issues/1430
  afterEach(() => {
    cleanup();
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("Todoを追加", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    render(<TodoHeader completedTodosCount={0} todosCount={0} />);

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "foo");

    expect(input).toHaveValue("foo");

    await user.type(input, "{Enter}");

    expect(input).toHaveValue("");
    expect(spy).toHaveBeenCalledWith({ title: "foo" });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("全てのTodoを切り替え", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    render(<TodoHeader completedTodosCount={0} todosCount={1} />);

    await user.click(screen.getByRole("checkbox"));

    expect(spy).toHaveBeenCalledWith({});
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
