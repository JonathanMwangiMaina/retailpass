# **RetailPass**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Render Deploy](https://img.shields.io/badge/Render-Deployed-46E3B7?logo=render&logoColor=white)](https://render.com)

A modern, AI-powered authentication platform built with Next.js 15 that provides secure user registration, login, and profile management with intelligent password strength analysis. RetailPass leverages Google's Gemini AI to deliver real-time password security feedback, helping users create stronger credentials.

## **Key Features**

* **AI-Powered Password Analysis** — Integrates Google Gemini 2.0 Flash via Firebase Genkit to provide real-time password strength assessment with actionable security recommendations
* **Secure Authentication System** — Complete user authentication flow with session management, persistent login state, and client-side credential handling
* **Profile Management** — Full-featured user profile interface supporting account updates, password changes, and secure session control
* **Modern UI/UX** — Built with shadcn/ui, Radix UI primitives, and Tailwind CSS for a responsive, accessible, and visually polished experience

## **Architecture / System Design**

RetailPass follows a modern Next.js App Router architecture with server-side and client-side rendering patterns:

1. **Authentication Flow**: Client-side React Context (`AuthContext`) manages user state and authentication operations. User credentials are validated and persisted in browser localStorage for session continuity.

2. **AI Integration Layer**: Firebase Genkit acts as a middleware orchestrator, connecting React form inputs to Google's Gemini AI API. Password strength analysis requests flow through server actions to maintain API key security.

3. **Component Hierarchy**: The application uses atomic design principles with shadcn/ui components at the base, composed into authentication-specific components (`SignupForm`, `LoginForm`, `ProfileForm`), wrapped in layout containers, and orchestrated by Next.js page routes.

4. **Data Flow**: User input → React Hook Form validation → Genkit server action → Gemini AI analysis → Real-time UI feedback with debounced updates to optimize API calls.

## **Prerequisites**

* **Node.js** `20.x` or higher
* **npm** `9.x` or higher
* **Google AI API Key** — Required for password strength analysis ([Get your key here](https://aistudio.google.com/app/apikey))

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

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```bash
# Development environment
NODE_ENV=development

# Google AI API Key for Genkit password strength analysis
GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
```

**Important**: Replace `your_google_ai_api_key_here` with your actual Google AI API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:9002` (or `http://localhost:3000` if port 9002 is unavailable).

### 5. (Optional) Start Genkit development tools

For advanced AI flow debugging and monitoring:

```bash
npm run genkit:dev
```

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
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── login/             # Login page route
│   │   ├── signup/            # Signup page route
│   │   ├── profile/           # User profile page route
│   │   └── layout.tsx         # Root layout component
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── profile/           # Profile management components
│   │   ├── shared/            # Shared/common components
│   │   └── ui/                # shadcn/ui base components
│   ├── contexts/              # React Context providers
│   │   └── AuthContext.tsx   # Authentication state management
│   ├── hooks/                 # Custom React hooks
│   ├── ai/                    # Genkit AI flows and configuration
│   │   ├── flows/             # AI flow definitions
│   │   └── genkit.ts          # Genkit AI initialization
│   └── lib/                   # Utility functions
├── .env.local                 # Environment variables (not committed)
├── package.json               # Project dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## **Tech Stack**

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15.3.3 (React 18, App Router, Turbopack) |
| **Language** | TypeScript 5.9.3 |
| **AI/ML** | Firebase Genkit 1.8.0, Google AI (Gemini 2.0 Flash) |
| **UI Library** | shadcn/ui, Radix UI primitives |
| **Styling** | Tailwind CSS 3.4, tailwindcss-animate |
| **Form Management** | React Hook Form 7.54 with Zod validation |
| **State Management** | React Context API |
| **Icons** | Lucide React |

## **Key Design Patterns**

* **Server Actions** — Genkit flows run as Next.js server actions to keep API keys secure and reduce client bundle size
* **Debounced API Calls** — Password strength analysis uses a 500ms debounce to minimize unnecessary AI API requests while typing
* **Atomic Design** — UI components are structured from base primitives (shadcn/ui) to composed authentication forms
* **Type Safety** — Full TypeScript coverage with Zod schema validation for runtime type safety and form validation

## **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Jonathan Maina**
