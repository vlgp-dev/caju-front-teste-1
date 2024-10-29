import { test, expect } from "@playwright/test";

const json = [
  {
    id: "1",
    admissionDate: "22/10/2023",
    email: "filipe@caju.com.br",
    employeeName: "Filipe Marins",
    status: "REVIEW",
    cpf: "91908871075",
  },
  {
    id: "2",
    admissionDate: "22/10/2023",
    email: "jose@caju.com.br",
    employeeName: "José Leão",
    status: "REPROVED",
    cpf: "78502270001",
  },
  {
    id: "3",
    admissionDate: "22/10/2023",
    email: "luiz@caju.com.br",
    employeeName: "Luiz Filho",
    status: "APPROVED",
    cpf: "56642105087",
  },
];

test("should load registrations", async ({ page }) => {
  await page.route(
    "http://localhost:3000/registrations?cpf=",
    async (route) => {
      await route.fulfill({ json });
    }
  );

  await page.goto("/");

  const registrations = page.getByTestId("registration-card");

  expect(registrations).toHaveCount(3);
});

test("should filter by cpf", async ({ page }) => {
  await page.route(
    "http://localhost:3000/registrations?cpf=*",
    async (route, request) => {
      const url = new URL(request.url());
      const cpf = new URLSearchParams(url.searchParams).get("cpf");

      const result = cpf ? json.filter((item) => item.cpf === cpf) : json;

      await route.fulfill({ json: result });
    }
  );

  await page.goto("/dashboard");

  await page.getByPlaceholder("Digite um CPF válido").click();
  await page.getByPlaceholder("Digite um CPF válido").fill("91908871075");

  expect(page.url()).toContain(`/dashboard?cpf=${json[0].cpf}`);

  const registrations = page.getByTestId("registration-card");

  expect(registrations).toHaveCount(1);
  expect(page.getByText(json[0].employeeName)).toBeVisible();
});

test("should be able to update registration's status", async ({ page }) => {
  const jsonData = structuredClone(json);

  await page.route("*//localhost:3000/registrations*", async (route) => {
    await route.fulfill({ json: jsonData });
  });

  await page.route(
    "*//localhost:3000/registrations/*",
    async (route, request) => {
      const data = request.postDataJSON();
      jsonData[data.id - 1] = data;

      await route.fulfill({ json: jsonData });
    }
  );

  await page.goto("/dashboard");

  const approvedRegistration = page
    .getByTestId("column")
    .filter({ hasText: "Aprovado" })
    .getByTestId("registration-card");

  await approvedRegistration
    .getByRole("button", { name: "Revisar novamente" })
    .first()
    .click();
  await page.getByRole("button", { name: "Confirmar" }).click();

  const reviewRegistrations = page
    .getByTestId("column")
    .filter({ hasText: "Pronto para revisar" })
    .getByTestId("registration-card");

  const approvedRegistrations = page
    .getByTestId("column")
    .filter({ hasText: "Aprovado" })
    .getByTestId("registration-card");

  const reprovedRegistrations = page
    .getByTestId("column")
    .filter({ hasText: "Reprovado" })
    .getByTestId("registration-card");

  expect(reviewRegistrations).toHaveCount(2);
  expect(approvedRegistrations).toHaveCount(0);
  expect(reprovedRegistrations).toHaveCount(1);
});

test("should be able to remove registration", async ({ page }) => {
  const jsonData = structuredClone(json);

  await page.route("*//localhost:3000/registrations*", async (route) => {
    await route.fulfill({ json: jsonData });
  });

  await page.route(
    "*//localhost:3000/registrations/*",
    async (route, request) => {
      const id = Number(request.url().split("/").pop() ?? "1");
      jsonData.splice(id - 1, 1);

      await route.fulfill({ json: jsonData });
    }
  );

  await page.goto("/dashboard");

  await page.getByRole("button", { name: "remover" }).first().click();
  await page.getByRole("button", { name: "Confirmar" }).click();

  expect(page.getByTestId("registration-card")).toHaveCount(json.length - 1);
});

test("should be able to refetch", async ({ page }) => {
  const jsonData = structuredClone(json);

  await page.route("*//localhost:3000/registrations*", async (route) => {
    await route.fulfill({ json: jsonData });
  });

  await page.goto("/dashboard");

  const approvedRegistrations = page
    .getByTestId("column")
    .filter({ hasText: "Aprovado" })
    .getByTestId("registration-card");

  expect(approvedRegistrations).toHaveCount(1);

  jsonData[1].status = "APPROVED";

  await page.getByRole("button", { name: "atualizar" }).click();

  const updatedApprovedRegistrations = page
    .getByTestId("column")
    .filter({ hasText: "Aprovado" })
    .getByTestId("registration-card");

  const reprovedRegistrations = page
    .getByTestId("column")
    .filter({ hasText: "Reprovado" })
    .getByTestId("registration-card");

  expect(updatedApprovedRegistrations).toHaveCount(2);
  expect(reprovedRegistrations).toHaveCount(0);
});

test("should redirect to new user page", async ({ page }) => {
  await page.route(
    "http://localhost:3000/registrations?cpf=",
    async (route) => {
      await route.fulfill({ json });
    }
  );

  await page.goto("/");

  await page.getByText("Nova Admissão").click();

  expect(page.url()).toBe("http://localhost:3001/#/new-user");
});
