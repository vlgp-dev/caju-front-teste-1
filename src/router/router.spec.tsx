import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("~/pages/Dashboard", () => ({
  default: () => <div>Dashboard</div>,
}));

jest.mock("~/pages/NewUser", () => ({
  default: () => <div>New User</div>,
}));

import routes from "./routes";

import Router from "./index";

describe("Router", () => {
  it("should render DashboardPage for the dashboard route", () => {
    render(
      <MemoryRouter initialEntries={[routes.dashboard]}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("should render NewUserPage for the new user route", () => {
    render(
      <MemoryRouter initialEntries={[routes.newUser]}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText("New User")).toBeInTheDocument();
  });

  it("should redirect to the dashboard for unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
