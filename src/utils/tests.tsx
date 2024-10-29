import { type ReactNode } from "react";

import * as testingLibrary from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import { theme } from "~/theme.styles";

const { render, screen, ...rest } = testingLibrary;

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui: ReactNode, options?: testingLibrary.RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export default rest;

export { customRender as render, screen };
