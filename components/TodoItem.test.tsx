import { TodoItem } from "@/components/TodoItem";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("<TodoItem/>", () => {
  // Temporary workaround for https://github.com/vitest-dev/vitest/issues/1430
  afterEach(() => {
    cleanup();
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("Todoを修正後フォーカスアウト", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    render(
      <TodoItem
        todo={{
          id: "01FYH5XVSNVSXTSGB8KB858REF",
          title: "foo",
          completed: false,
        }}
      />,
    );

    await user.dblClick(screen.getByText("foo"));

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "bar");
    await user.click(document.body);

    expect(spy).toHaveBeenCalledWith({
      _action: "update",
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "bar",
      completed: "false",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("Todoを修正後エンター", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    render(
      <TodoItem
        todo={{
          id: "01FYH5XVSNVSXTSGB8KB858REF",
          title: "foo",
          completed: false,
        }}
      />,
    );

    await user.dblClick(screen.getByText("foo"));

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "{b}{a}{r}{Enter}");

    expect(spy).toHaveBeenCalledWith({
      _action: "update",
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "bar",
      completed: "false",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("Todoを空文字に修正して削除", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    render(
      <TodoItem
        todo={{
          id: "01FYH5XVSNVSXTSGB8KB858REF",
          title: "foo",
          completed: false,
        }}
      />,
    );

    await user.dblClick(screen.getByText("foo"));

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "{Enter}");

    expect(spy).toHaveBeenCalledWith({
      _action: "update",
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "",
      completed: "false",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("Todoを削除ボタンで削除", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    render(
      <TodoItem
        todo={{
          id: "01G46BYCGQ1SGVGFMEXZ0DKZAY",
          title: "bar",
          completed: false,
        }}
      />,
    );

    await user.click(screen.getByRole("button"));

    expect(spy).toHaveBeenCalledWith({
      _action: "delete",
      id: "01G46BYCGQ1SGVGFMEXZ0DKZAY",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // TODO: https://github.com/vercel/next.js/issues/54757
  it.todo("Todoを切り替え", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    render(
      <TodoItem
        todo={{
          id: "01G46BZM28F68BCY7EP016G1EZ",
          title: "baz",
          completed: false,
        }}
      />,
    );

    await user.click(screen.getByRole("checkbox"));

    expect(spy).toHaveBeenCalledWith({
      _action: "update",
      id: "01G46BZM28F68BCY7EP016G1EZ",
      title: "baz",
      completed: "true",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
