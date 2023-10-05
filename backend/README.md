This is a [ExpressJs](https://expressjs.com) project

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Directory Structure

`├──`[`src`](./src) — Web application backend-end <br>
&emsp;&emsp;`└──`[`app.ts`](./src/app.ts) — Express and middleware Bootstrap<br>
&emsp;&emsp;`└──`[`index.ts`](./src/index.ts) — App Start Up<br>
&emsp;&emsp;`└──`[`common`](./src/common) — Keep Common Database such as datasource, migrations, entities and ...<br>
&emsp;&emsp;`└──`[`config`](./src/config) — handle app config and .env and inject to app<br>
&emsp;&emsp;`└──`[`middlewares`](./src/middlewares) — middleware files such as auth, error handling and ...<br>
&emsp;&emsp;`└──`[`routes`](./src/routes) — main application routing<br>
&emsp;&emsp;&emsp;&emsp;`└──`[`routes/v1`](./src/routes/v1) — separate versioning by number <br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;`└──`[`routes/v1/[...]`](./src/routes/v1/[...]) — each route include 4 part <br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;`└──`[`routes/v1/[...]/dto`](./src/routes/v1/[...]/dto) — keep app request validation and dto(s) <br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;`└──`[`routes/v1/[...]/[].controller`](./src/routes/v1/[...]/[].controller) — include controllers <br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;`└──`[`routes/v1/[...]/[].route`](./src/routes/v1/[...]/[].route) — manage routes and related middlewares <br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;`└──`[`routes/v1/[...]/[].services`](./src/routes/v1/[...]/[].services) — handle main application connection with database <br>
&emsp;&emsp;`└──`[`types`](./src/types) — keep common types<br>
&emsp;&emsp;`└──`[`urils`](./src/utils) — keep app utils functions<br>
`└──`[`tsconfig.json`](./tsconfig.json) — The root TypeScript configuration<br>
`└──`[`package.json`](./package.json) — Project dependencies and scripts <br>
`└──`[`nodemon.json`](./nodemon.json) — Nodemon Configuration <br>
`└──`[`WN.postman_collection.json`](./WN.postman_collection.json) — App Postman Api Docs  <br>
`└──`[`next.config.js`](./next.config.js) — Configuration file for Next.js <br>

#### This Application using jwt `Passport` to manage Authentication & Authorization, `Typeorm` to connect to DB