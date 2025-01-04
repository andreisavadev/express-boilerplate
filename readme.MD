# Express Boilerplate

Express API boilerplate to quickly start new projects.

## Info

- I used ```pnpm``` as packet manager
- Inspired by [Express-Prisma-Typescript](https://github.com/YounesseElkars/Express-Prisma-TypeScript) but i changed and added a few things
- It has some basic jwt authentication to start with

## Tech Stack

- Typescript
- Node.js
- Express.js
- Prisma with sqlite (can be changed as needed)
- Zod
- Winston

## Project structure
```sh
/project_folder/
|--- .logs/
|--- prisma/
|--- src/
|    |--- config/
|    |--- controllers/
|    |--- middleware/
|    |--- routes
|    |    |--- v1/
|    |--- services/
|    |--- types/
|    |--- utils/
|    |--- app.ts
|    |--- server.ts
```

## Usage

- Clone this repository
- Run ```pnpm install``` to install dependencies
- Modify as needed 
