Certainly! Here's the modified version of your README file with the added instructions to change the directory and install the necessary dependencies:

---

# Getting Started with the Project

Before starting the development server, you need to navigate to the project directory and install the required dependencies. Follow these steps:

1. **Change to the project directory:**

```bash
cd litigate-iq-ux-main
```

2. **Install the required node modules:**

```bash
npm install
```

After installing the dependencies, you can proceed with starting the development server.

## Development Server

Run the following command to start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page will auto-update as you edit the file.

## Font Optimization

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can also check out [the Next.js GitHub repository](https://github.com/vercel/next.js). Your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

For more details, visit our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

This version adds the necessary steps to first `cd` into the project directory and install the dependencies before running the development server.