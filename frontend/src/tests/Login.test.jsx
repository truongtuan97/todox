import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LoginPage from "../pages/login.page";

test("renders login form", () => {
    render(
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your password")).toBeInTheDocument();
});

test("updates input value", () => {
    render(
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("you@example.com");

    fireEvent.change(input, { target: { value: "test@test.com" } });

    expect(input).toHaveValue("test@test.com");
});