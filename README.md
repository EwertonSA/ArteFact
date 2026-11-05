# ArteFact Task Manager

A small task-management application built as a technical assessment project. It provides a web interface for browsing, creating, editing, and deleting tasks.

## Features

- Browse tasks with cursor-based pagination
- Create tasks with a title and description
- View and edit an individual task
- Delete tasks
- Validate task data with Zod
- Use type-safe client/server communication with tRPC

## Tech stack

- [Next.js 15](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [tRPC](https://trpc.io/) and [TanStack Query](https://tanstack.com/query)
- [Zod](https://zod.dev/) for input validation
- CSS Modules

## Getting started

### Prerequisites

- Node.js (a current LTS release is recommended)
- npm

### Install and run

```bash
git clone https://github.com/EwertonSA/ArteFact.git
cd ArteFact
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server (after building) |
| `npm run lint` | Run ESLint |

## Data storage

Tasks are currently stored in an in-memory array and initialized with sample records. This is suitable for trying out the application, but data is not persisted to a database and may be reset when the server restarts.

## Project structure

```text
src/
├── Components/       # Reusable task UI components
├── app/              # Next.js pages, routes, and styles
│   └── NewTask/      # Task creation and editing pages
└── server/           # tRPC router, task validation, and in-memory data
```

## tRPC task procedures

The task router exposes procedures to list tasks (`show`), fetch one task (`getById`), create (`create`), update (`update`), and delete (`delete`) tasks. The list procedure supports a page size and cursor.

## License

No license has been specified for this project.
