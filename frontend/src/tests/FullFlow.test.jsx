import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import App from "../App";
import api from "@/lib/axios";

vi.mock("@/lib/axios", () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      interceptors: { request: { use: vi.fn() } },
    },
  };
});

describe("Full flow: Register → Login → Create Task → Display on UI", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("user can register, login, create task and see it", async () => {
    const createdTask = {
      _id: "task_1",
      title: "My first task",
      status: "active",
      createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
      completedAt: null,
    };

    api.post.mockImplementation((url) => {
      if (url === "/auth/register") {
        return Promise.resolve({ data: { message: "ok" } });
      }
      if (url === "/auth/login") {
        return Promise.resolve({ data: { token: "test-token" } });
      }
      if (url === "/tasks") {
        return Promise.resolve({ data: { message: "created" } });
      }
      return Promise.reject(new Error(`Unhandled POST ${url}`));
    });

    api.get
      .mockResolvedValueOnce({
        data: { tasks: [], activeCount: 0, completeCount: 0 },
      })
      .mockResolvedValueOnce({
        data: { tasks: [createdTask], activeCount: 1, completeCount: 0 },
      });

    window.history.pushState({}, "Register", "/register");
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    expect(await screen.findByRole("heading", { name: "Login" })).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(await screen.findByRole("button", { name: "Logout" })).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Can phai lam gi?"), {
      target: { value: "My first task" },
    });
    fireEvent.click(screen.getByRole("button", { name: /them/i }));

    await waitFor(() => {
      expect(screen.getByText("My first task")).toBeInTheDocument();
    });
  });
});

