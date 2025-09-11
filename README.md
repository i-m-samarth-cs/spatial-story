This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

## About the codebase

Here follows a brief overview of the codebase:

## How to add a new component

To add a new component, you need to do three things:

1. Update the content model, which describes the structure of the content with TypeScript types; see `src/content/content-model.ts`.
2. Create a component that renders the content; see `src/components/`.
3. Register the component in `src/lib/storyblok.ts`

## Validation/Parsing

This project has TypeScript types that describe the content model; however, by default, this content is not validated. To parse the content, find the comment that says `// Parsing: ` and uncomment the lines below.

You can use any validation library you prefer—this project uses [PureParse](https://pureparse.dev/) because this library allows you to [type check the parser](https://pureparse.dev/guide/why-pure-parse.html#why-pureparse).

In this case, when you add a new component, you will also need to update the parsing logic.

## General

For issues related to the Business blueprint, please open issues at the corresponding template repository:

- Nextjs: https://github.com/storyblok/blueprint-business-nextjs/issues
- Nuxt: https://github.com/storyblok/blueprint-business-nuxt/issues
