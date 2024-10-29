
# Caju Front End Teste

## Considerações

1. Alterei o arquivo `db.json`, pois um dois `status` estava como `APROVED` em vez de `APPROVED`. Considerei que era apenas um erro de digitação.
Caso fosse uma diferença com o campo na `API` de fato, criaria um `mapper` para atuar junto aso serviço e fizesse o mapeamento correto dos dados.

2. A cada atualização de `status` feita no `dashboard`, a aplicação está fazendo uma nova requisição para a `API` a fim de atualizar os cards na tela.
Entendo que pela simplicidade atual da aplicação, essa requisição seria desnecessária, mas em um cenário em que os resultados sejam paginados, por exemplo, o front end não deveria ser responsável por escolher quais dados mostrar.

3. Para a filtragem pelo `CPF`, adicionei na URL o valor do documento quando válido, de forma que seria simples salvar ou compartilhar links já filtrados. Entendo que por questões de segurança a atendimento à `LGPD`, talvez isso não seja o ideal, visto que é um documento individual. Entretanto, para fins do exercício proposto, define utilizar dessa forma já não representa uma real vulnerabilidade.

4. Algumas cores foram alteradas em relação ao projeto original, visando atender regras de contraste para melhor acessibilidade das páginas.

5. Utilizei algumas bibliotecas de componentes para acelerar o desenvolvimento e garantir melhor acessibilidade. Não utilizei uma única biblioteca, o que entendo que seria melhor em uma aplicação real, evitando duplicidade de códigos que podem existir entre diferentes pacotes, além de facilitar a experi6encias dos desenvolvedores que teriam acesso mais fácil às documentações.

6. Não tive tempo hábil para desenvolver todos os testes unitários e de integração , que em um cenário real seriam desenvolvidos juntamente com os componentes e funções e não somente no final do desenvolvimento.
Contudo, escrevi alguns testes `end-to-end` para garantir o corretor funcionamento da aplicação.

7. Todas as `features` foram adicionadas em um único `commit` devido ao tempo de desenvolvimento, mas entendo que em um projeto real isso seria extremamente prejudicial para o processo de `code review` e garantia de qualidade do código.

8. Algumas melhorias tamb;em seriam feitas na sequência, como ajuste de nomenclatura das cores e `tokens` do tema, remoção de estilos `inline` e duplicidade de estilos entre alguns componentes (como `DatePicker` e `TextField`).

Para quaisquer dúvidas sobre o teste, estou à disposição.

--------------------------------------------------------



Esse é um desafio técnico para você demonstrar suas habilidades como frontend, sua missão será dar continuidade ao desenvolvimento da plataforma de admissão que consiste em duas telas, a tela de `Dashboard` e uma tela de `Cadastro`.

O `Dashboard` mostra todas as admissões criadas, com as opções de aprovar, reprovar e excluir.

![Screenshot 2024-06-11 at 11 48 24 AM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/fedeff5c-a0d3-4df1-aebd-1f2d25c56a48)

Dashboard com a listagem das admissões.

![Screenshot 2024-06-11 at 1 52 35 PM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/3b002341-454b-4b24-82cb-6390656b56cc)

A tela de `Cadastro` exibe um formulário simples que será utilizado para criar as admissões.

![Screenshot 2024-06-11 at 11 48 47 AM](https://github.com/caju-beneficios/caju-front-teste-1/assets/31169925/bbbb211c-165f-40e5-b2af-61adafd61398)

## Apresentanção do problema

O desafio é aprimorar o código existente e implementar as funcionalidades que estão incompletas, use a sua experiência para identificar e propor soluções para os problemas encontrados.
Sinta-se a vontade para refatorar, criar novas pastas, componentes, hooks, utils e o que mais achar necessário para garantir que o projeto esteja organizado e segue as boas práticas de desenvolvimento.


## Especificações

### Tela Dashboard

- Implementar `GET` ao carregar a pagina e ao fazer pequisa por `CPF`
- Filtrar os cards por coluna, usando o status.
- Implementar `PUT` ao clicar em Reprovar e alterar o status para `REPROVED`
- Implementar `PUT` ao clicar em Aprovar e alterar o status para `APPROVED`
- Implementar `PUT` ao clicar em Revisar novamente e alterar o status para `REVIEW`
- Implementar `DELETE` ao clicar no lixeira no card.
- O botão de `Reprovar` e `Aprovar` só deve aparecer em admissões com o status `REVIEW` 
- O botão `Revisar novamente` só deve aparecer em admissões com o status `REPROVED` ou `APPROVED`
- Implementar um loading na tela ao realizar requisições.
- Todas as ações devem ter modal de confirmação e uma notificação de sucesso ou erro
- Na pesquisa por CPF realizar a requisição automaticamente ao preencher um CPF válido
- Adicionar máscara de CPF no campo de pesquisa.
- Atualizar os dados (refetch) ao clicar no ícone de atualizar


### Tela Cadastro

- Implementar validação no campo de `email` para que aceite apenas emails válidos
- Implementar validação no campo `nome completo` para que aceite pelo menos um espaço, no mínimo duas letras, e que a primeira letra não seja um número.
- Implementar validação no campo CPF para aceitar apenas CPFs válidos e adicionar uma máscara de CPF ao campo.
- Implementar `POST` ao preencher todos os campos corretamentes.
- Redirecionar ao `/dashboard` ao criar uma nova admissão.


## API
Você consumirá uma API mockada localmente, que será executada utilizando o json-server. Para mais informações consulte a [documentação](https://github.com/typicode/json-server/).

Exemplo de Requisição:

```
POST http://localhost:3000/registrations
Content-Type: application/json
{
  "admissionDate": "23/10/2023",
  "email": "maria@caju.com.br",
  "employeeName": "Maria Silva",
  "status": "REVIEW",
  "cpf": "12345678901"
}
```

Para realizar a pesquisa por CPF, utilize essa funcionalidade do json-web-server:
<br/>
https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#filter


## Extras (opcional)

- Testes Unitários e de Integração `(Obrigátorio para Senior e Tech Lead)`
- End-to-End (E2E) 
- Configuração de CI/CD com deploy automatizado

## Dicas e sugestões

- Faça bom uso da componentização
- Garanta que a aplicação é performática
- Faça bom uso do HTML e WAI-ARIA
- Garanta uma experiência fluida e acessível
- Utilize conceitos (SOLID, DRY, KISS, Clean code) e design patterns
- Crie testes coesos e que garantam o bom funcionamento da aplicação

### Sua performance será avaliada com base nos seguintes pontos:

- A aplicação funciona conforme o esperado seguindo todas as especificações
- O código é claro e de fácil entendimento
- Conhecimento em HTML, CSS, JavaScript / TypeScript e React
- Experiência do usuário
- Arquitetura (conceitos, patterns, algoritmos, forma como os problemas foram solucionados)
- Boas práticas de desenvolvimento
- Proeficiência com automação de testes. Não exigimos 100% de cobertura
- Senso crítico e analítico

`Nos surpreenda demonstrando toda a sua habilidade e conhecimento.`

## Iniciando o desenvolvimento

Realize o clone do repositório e instale as dependências

```shell
git clone https://github.com/caju-beneficios/caju-front-teste-1.git
cd caju-front-test-1
```

```shell
yarn install
```

Inicie o servidor do Json Web Server para consumir a API

```shell
yarn init:db
```

Execute a aplicação

```shell
yarn dev
```

Se tudo ocorreu bem os seguintes serviços estarão disponiveis em:
<br/>

Aplicação http://localhost:3001/
<br/>
Json Web Server http://localhost:3000/

Caso necessite executar a suíte de testes use o comando abaixo:

```shell
yarn test:dev
```


Para concluir o desenvolvimento faça as edições necessárias e depois envie a URL do novo repositório com suas alterações para o RH.

