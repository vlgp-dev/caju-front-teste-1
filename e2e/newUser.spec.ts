import { test, expect } from "@playwright/test";

const fakeData = {
  id: "1",
  admissionDate: "22/10/2023",
  email: "filipe@caju.com.br",
  employeeName: "Filipe Marins",
  status: "REVIEW",
  cpf: "91908871075",
};

test("should add new registration", async ({ page }) => {
  await page.route(
    "http://localhost:3000/registrations*",
    async (route, request) => {
      if (request.method() === "POST") {
        return await route.fulfill({ json: fakeData });
      }
    }
  );

  await page.goto("/#/new-user");

  await page.getByPlaceholder("Nome").fill(fakeData.employeeName);
  await page.getByPlaceholder("Email").fill(fakeData.email);
  await page.getByPlaceholder("CPF").fill(fakeData.cpf);
  await page.getByPlaceholder("Data de admissão").fill(fakeData.admissionDate);

  await page.getByText("Cadastrar").click();

  expect(page.url()).toBe("http://localhost:3001/#/dashboard");
});

test("should validate fields", async ({ page }) => {
  await page.route(
    "http://localhost:3000/registrations*",
    async (route, request) => {
      if (request.method() === "POST") {
        return await route.fulfill({ json: fakeData });
      }
    }
  );

  await page.goto("/#/new-user");

  await page.getByText("Cadastrar").click();

  expect(
    page.getByText("O nome deve conter pelo menos duas letras")
  ).toBeVisible();
  expect(page.getByText("Por favor, preencha o e-mail")).toBeVisible();
  expect(page.getByText("Por favor, preencha o CPF")).toBeVisible();
  expect(page.getByText("Data inválida")).toBeVisible();
});
