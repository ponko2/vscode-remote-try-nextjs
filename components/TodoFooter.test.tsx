import { TodoFooter } from "@/components/TodoFooter";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("<TodoFooter/>", () => {
  // Temporary workaround for https://github.com/vitest-dev/vitest/issues/1430
  afterEach(() => {
    cleanup();
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("全てを表示", async () => {
    const user = userEvent.setup();
    const action = vi.fn();

    render(<TodoFooter completedTodosCount={1} todosCount={2} />);

    const button = await screen.findByText("All");

    expect(button).not.toHaveClass("border-red-700");

    await user.click(button);

    expect(button).toHaveClass("border-red-700");
    expect(action).not.toHaveBeenCalled();
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("未完了のものを表示", async () => {
    const user = userEvent.setup();
    const action = vi.fn();

    render(<TodoFooter completedTodosCount={1} todosCount={2} />);

    const button = await screen.findByText("Active");

    expect(button).not.toHaveClass("border-red-700");

    await user.click(button);

    expect(button).toHaveClass("border-red-700");
    expect(action).not.toHaveBeenCalled();
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("完了したものを表示", async () => {
    const user = userEvent.setup();
    const action = vi.fn();

    render(<TodoFooter completedTodosCount={1} todosCount={2} />);

    const button = await screen.findByText("Completed");

    expect(button).not.toHaveClass("border-red-700");

    await user.click(button);

    expect(button).toHaveClass("border-red-700");
    expect(action).not.toHaveBeenCalled();
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("完了したものを削除", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    render(<TodoFooter completedTodosCount={1} todosCount={2} />);

    await user.click(await screen.findByText("Clear completed"));

    expect(spy).toHaveBeenCalledWith({});
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
