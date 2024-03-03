import { TodoButton } from "@/components/TodoButton";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("<TodoButton/>", () => {
  // Temporary workaround for https://github.com/vitest-dev/vitest/issues/1430
  afterEach(() => {
    cleanup();
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("子要素を表示", () => {
    const testMessage = "Test Message";
    render(<TodoButton>{testMessage}</TodoButton>);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("クリックで関数を実行", async () => {
    const user = userEvent.setup();
    const testMessage = "Test Message";
    const spy = vi.fn();
    render(<TodoButton onClick={spy}>{testMessage}</TodoButton>);
    expect(spy).not.toHaveBeenCalled();
    await user.click(screen.getByText(testMessage));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
