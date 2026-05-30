# **RetailPass**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.9-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel&logoColor=white)](https://vercel.com)

A modern authentication platform built with Next.js 15 that provides secure user registration, login, and profile management with intelligent password strength analysis. RetailPass delivers real-time password security feedback using algorithmic validation, helping users create stronger credentials.

## **Key Features**

* **Smart Password Analysis** — Real-time password strength assessment with actionable security recommendations based on length, character variety, and common pattern detection
* **Secure Authentication System** — Complete user authentication flow with session management, persistent login state, and client-side credential handling
* **Profile Management** — Full-featured user profile interface supporting account updates, password changes, and secure session control
* **Modern UI/UX** — Built with shadcn/ui, Radix UI primitives, and Tailwind CSS for a responsive, accessible, and visually polished experience

## **Architecture / System Design**

RetailPass follows a modern Next.js Pages Router architecture with server-side and client-side rendering patterns:

1. **Authentication Flow**: Client-side React Context (`AuthContext`) manages user state and authentication operations. User credentials are validated and persisted in browser localStorage for session continuity.

2. **Password Validation Layer**: Local algorithmic password strength analysis runs through an API route (`/api/analyze-password`), providing real-time feedback based on character variety, length requirements, and common pattern detection.

3. **Component Hierarchy**: The application uses atomic design principles with shadcn/ui components at the base, composed into authentication-specific components (`SignupForm`, `LoginForm`, `ProfileForm`), wrapped in layout containers, and orchestrated by Next.js Pages Router.

4. **Data Flow**: User input → React Hook Form validation → API route analysis → Algorithmic strength calculation → Real-time UI feedback with optimized updates.

## **Prerequisites**

* **Node.js** `20.x` or higher
* **npm** `9.x` or higher

## **Installation & Setup**

### 1. Clone the repository

```bash
git clone https://github.com/JonathanMwangiMaina/retailpass.git
cd retailpass
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:9002` (or `http://localhost:3000` if port 9002 is unavailable).

## **Usage**

### **Running the Application**

Start the development server with Turbopack (Next.js 15's optimized bundler):

```bash
npm run dev
```

### **Building for Production**

Create an optimized production build:

```bash
npm run build
npm start
```

### **Running Type Checks**

Validate TypeScript types across the codebase:

```bash
npm run typecheck
```

### **Linting**

Run ESLint to check code quality:

```bash
npm run lint
```

## **Project Structure**

```
retailpass/
├── pages/                     # Next.js Pages Router
│   ├── api/                   # API routes
│   │   └── analyze-password.ts  # Password strength API endpoint
│   ├── _app.tsx              # App wrapper with providers
│   ├── _document.tsx         # HTML document structure
│   ├── index.tsx             # Home page (redirects)
│   ├── login.tsx             # Login page
│   ├── signup.tsx            # Signup page
│   └── profile.tsx           # User profile page
├── src/
│   ├── components/           # React components
│   │   ├── auth/             # Authentication components
│   │   ├── profile/          # Profile management components
│   │   ├── layout/           # Layout components (header, etc.)
│   │   ├── shared/           # Shared/common components
│   │   └── ui/               # shadcn/ui base components
│   ├── contexts/             # React Context providers
│   │   └── AuthContext.tsx  # Authentication state management
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   │   └── password-validator.ts  # Password strength algorithm
│   └── types/                # TypeScript type definitions
├── styles/                   # Global styles
│   └── globals.css          # Tailwind CSS styles
├── public/                   # Static assets
├── package.json              # Project dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## **Tech Stack**

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15.3.9 (React 18, Pages Router, Turbopack) |
| **Language** | TypeScript 5.8.2 |
| **Password Validation** | Local algorithmic analysis (length, variety, pattern detection) |
| **UI Library** | shadcn/ui, Radix UI primitives |
| **Styling** | Tailwind CSS 3.4, tailwindcss-animate |
| **Form Management** | React Hook Form 7.54 with Zod validation |
| **State Management** | React Context API |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## **Key Design Patterns**

* **API Routes** — Password analysis runs through Next.js API routes for consistent server-side validation
* **Pages Router Architecture** — Uses proven Next.js Pages Router for reliable SSR and static generation
* **Atomic Design** — UI components are structured from base primitives (shadcn/ui) to composed authentication forms
* **Type Safety** — Full TypeScript coverage with Zod schema validation for runtime type safety and form validation
* **Client-Side Routing** — Fast navigation with window.location for authentication flows

## **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Jonathan Maina**
