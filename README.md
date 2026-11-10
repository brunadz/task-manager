# ✳ task manager

Um gerenciador de tarefas desenvolvido com **Angular** e **JSON Server**, feito para organizar o caos do dia a dia. Crie tarefas, defina prioridades, acompanhe prazos e mantenha tudo em seu devido lugar.

![Task Manager Preview](src/docs/task-manager-screenshot.png)

## ✳ features

- **Task organization** — tarefas separadas entre *Em andamento* e *Feitas*, com contadores individuais.
- **Full CRUD** — crie, edite e exclua tarefas.
- **Done is done** — marque tarefas como concluídas e acompanhe seu progresso.
- **Smart filters** — busque por nome e filtre por vencimento, prioridade ou categoria.
- **Priority levels** — Alta, Média e Baixa.
- **Categories** — Trabalho, Pessoal e Doméstico.
- **Overdue alerts** — identificação visual de tarefas atrasadas.
- **Data persistence** — armazenamento e gerenciamento via API REST local.

## ✳ tech stack

| Technology | Usage |
|---|---|
| [Angular](https://angular.dev/) 22 | Frontend |
| [JSON Server](https://github.com/typicode/json-server) | Local REST API |

## ✳ getting started

Clone o repositório e instale as dependências:

```bash
npm install
```

**01. Start the API**

```bash
npm run api
```

API disponível em `http://localhost:3000`.

**02. Start the application**

Em outro terminal:

```bash
ng serve
```

Acesse `http://localhost:4200`.

## ✳ data & testing

A coleção de tarefas está disponível em:

`http://localhost:3000/tarefas`

Os dados são armazenados localmente no arquivo `db.json`.

Para executar os testes:

```bash
ng test
```

---

<sub>made with ♡</sub>
