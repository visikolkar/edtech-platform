# EdTech Learning Platform

A Next.js application with Hasura GraphQL backend for course enrollment and management.

## Features

- Browse available courses
- Enroll as student or professor
- Role-based access control
- Mock authentication system
- Responsive UI

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/visikolkar/edtech-platform.git
cd edtech-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a .env.local file in the root directory:

```bash
NEXT_PUBLIC_HASURA_URL=https://nexus-horizon.hasura.app/v1/graphql
NEXT_PUBLIC_HASURA_SECRET=<request-for-secret>
```

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

`dev`: Runs the development server

`build`: Creates an optimized production build

`start`: Starts the production server

`lint`: Runs ESLint
