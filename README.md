# Cypress + BDD — ServeRest

Projeto de automação de testes para o **Frontend** ([front.serverest.dev](https://front.serverest.dev/)) e **API** ([serverest.dev](https://serverest.dev/)) utilizando **Cypress**, **JavaScript** e **BDD (Gherkin/Cucumber)**.

Neste projeto eu criei Page Objects para organizar a interação com o frontend, Factories para gerar dados de teste dinâmicos e Services para abstrair as chamadas de API. Os cenários foram escritos em BDD (Gherkin/Cucumber), separados por funcionalidade (E2E e API), incluindo fluxos principais e alternativos com Esquemas do Cenário. 

Também implementei custom commands para reutilização e cleanup dos dados, além de relatório HTML (Mochawesome) e CI/CD com GitHub Actions para execução automática da suíte.

## Estrutura do projeto

```
cypress/
├── e2e/
│   ├── frontend/          # Cenários E2E em formato BDD (.feature)
│   └── api/               # 3 cenários de API em formato BDD (.feature)
├── factories/             # Geração dinâmica de massa de dados 
├── pages/                 # Page Objects do frontend
├── services/              # Camada de requisições HTTP para a API
└── support/
    ├── commands.js        # Custom commands reutilizáveis
    └── step_definitions/  # Implementação dos steps Gherkin
```

## Cenários automatizados

### Frontend (E2E)

| Feature | Cenário | Cobertura |
|---------|---------|-----------|
| `cadastro.feature` | Cadastrar usuário com dados válidos | Fluxo principal de cadastro |
| `login.feature` | Esquema do Cenário — login inválido | Credenciais inexistentes + email mal formatado |
| `login.feature` | Tentar login com senha incorreta | Usuário cadastrado com senha inválida |
| `carrinho.feature` | Adicionar produto ao carrinho | Fluxo pós-login e interação com produtos |
| `pesquisa.feature` | Pesquisar produto existente por nome completo | Filtro por nome e validação da listagem |
| `pesquisa.feature` | Esquema do Cenário — pesquisa com termos variados | Nome parcial, produto inexistente |
| `pesquisa.feature` | Pesquisar produto e adicionar ao carrinho | Fluxo integrado pesquisa + carrinho |

### API

| Feature | Cenário | Cobertura |
|---------|---------|-----------|
| `usuarios.feature` | Esquema do Cenário — cadastro de usuários | Dados válidos + combinação inválida (nome vazio) |
| `login.feature` | Login com credenciais válidas | Autenticação e retorno de token JWT |
| `login.feature` | Tentar login com senha incorreta | Usuário existente com senha inválida (401) |
| `login.feature` | Esquema do Cenário — login inválido | Email inexistente + email mal formatado |
| `produtos.feature` | Cadastrar produto como administrador autenticado | POST autenticado com perfil admin |
| `produtos.feature` | Tentar cadastrar produto com dados inválidos | Validação de campos obrigatórios e preço inválido (`ProductFactory.invalidProduct()`) |

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- npm

## Instalação

```bash
npm install
```

## Execução

```bash
# Abrir Cypress Test Runner (modo interativo)
npm run cy:open

# Executar todos os testes (headless)
npm run test

# Apenas testes E2E do frontend
npm run test:frontend

# Apenas testes de API
npm run test:api

# Executar todos os testes e gerar relatório HTML
npm run test:report
```

O relatório HTML será gerado em:

```
cypress/reports/html/index.html
```

## CI/CD (GitHub Actions)

O pipeline está configurado em `.github/workflows/cypress.yml` e executa automaticamente em:

- `push` na branch `main` ou `master`
- `pull_request` para `main` ou `master`
- disparo manual via **Actions → Cypress Tests → Run workflow**

### O que o pipeline faz

1. Instala dependências (`npm ci`)
2. Instala o binário do Cypress
3. Executa `npm run test:report` (todos os testes + relatório HTML)
4. Publica artefatos:
   - `cypress-html-report` 
   - `cypress-screenshots`
   - `cypress-videos` — em caso de falha

### Como visualizar o relatório no GitHub

1. Acesse a aba **Actions** do repositório
2. Abra a execução do workflow
3. Na seção **Artifacts**, baixe `cypress-html-report`
4. Abra o arquivo `index.html` localmente

## Boas práticas adotadas

- **BDD (Gherkin)**: cenários legíveis para negócio e QA com `Esquema do Cenário` para combinações de dados
- **Page Object Model**: seletores centralizados com `data-testid`
- **Factories**: dados únicos por execução garantindo independência entre testes
- **Services**: abstração das chamadas HTTP à API
- **Cleanup**: exclusão de usuários/produtos criados nos testes via `afterEach`
- **Sincronização**: uso de interceptações implícitas do Cypress e asserções com retry automático

## Evidências
<img width="1332" height="952" alt="Captura de tela 2026-07-07 131022" src="https://github.com/user-attachments/assets/defb3a9e-d30e-4fb8-802d-36028cad8b49" />

<img width="1908" height="857" alt="Captura de tela 2026-07-07 130812" src="https://github.com/user-attachments/assets/479d4f21-3c4f-4298-a0eb-01fd977b3c38" />

[report.pdf](https://github.com/user-attachments/files/30195259/report.pdf)


