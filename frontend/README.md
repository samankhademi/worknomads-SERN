This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

## Directory Structure

`├──`[`src`](./src) — Web application front-end built with [Next](https://nextjs.org/)<br>
&emsp;&emsp;`└──`[`app`](./src/app) — App Router<br>
&emsp;&emsp;`└──`[`components`](./src/components) — App Components<br>
&emsp;&emsp;&emsp;&emsp;`└──`[`containers`](./src/components/containers) — keep Page containers<br>
&emsp;&emsp;&emsp;&emsp;`└──`[`dashboard`](./src/components/dashboard) — keep Dashboard element and containers<br>
&emsp;&emsp;&emsp;&emsp;`└──`[`formElements`](./src/components/formElements) — keep App form elements like text fields and ...<br>
&emsp;&emsp;&emsp;&emsp;`└──`[`common`](./src/components/common) — keep App common components<br>
&emsp;&emsp;`└──`[`core`](./src/core) — Keep App Constants<br>
&emsp;&emsp;`└──`[`providers`](./src/providers) — Keep App Providers such as Guard and ...<br>
&emsp;&emsp;`└──`[`queries`](./src/queries) — Keep App Api call in the React Query format<br>
&emsp;&emsp;`└──`[`types`](./src/types) — Keep most used types<br>
&emsp;&emsp;`└──`[`utils`](./src/types) — Keep most utils functions<br>
`└──`[`tsconfig.json`](./tsconfig.json) — The root TypeScript configuration<br>
`└──`[`package.json`](./package.json) — Project dependencies and scripts <br>
`└──`[`postcss.config.js`](./postcss.config.js) — Keep Post Css Config <br>
`└──`[`tailwind.config.ts`](./tailwind.config.ts) — Keep Tailwind Config <br>
`└──`[`next.config.js`](./next.config.js) — Configuration file for Next.js <br>

#### This App use `Native React context Type` to manage Authentication & Authorization instead `Redux and Zustand` and because of time I didn't handle pages on server side 
####  and Note that all api calls from `/api/` will redirect to `http://localhost:3001`, you can find it in [`next.config.js`](./next.config.js)
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
