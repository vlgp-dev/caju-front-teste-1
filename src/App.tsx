import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

import Router from "~/router";

import { Header } from "./components/Header";
import { FiltersProvider } from "./context/filter";
import { theme } from "./theme.styles";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <FiltersProvider>
          <QueryClientProvider client={queryClient}>
            <Header>
              <h1>Caju Front Teste</h1>
            </Header>

            <Router />

            <ToastContainer position="top-center" />

            <ReactQueryDevtools client={queryClient} />
          </QueryClientProvider>
        </FiltersProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
