# Sanath MyHome Website - Project Architecture & Coding Structure

Welcome to the project architecture guide! This document outlines how the **Sanath MyHome** codebase is structured and how you can maintain its high-quality, clean, and scalable architecture as you integrate database connections, AI APIs, state managers, and authentication logic.

---

## 1. Directory Tree Overview
Here is how the project files are modularly structured inside `src/`:

```
src/
├── app/                      # NEXT.JS PAGE ROUTER (Routing & Metadata only)
│   ├── (InfoPages)/          # Static pages (About, Pricing, Terms, Privacy)
│   ├── (agent-dashboard)/    # Pages restricted to Agent actions
│   ├── (auth)/               # Authentication routing (Login, Register, OTP)
│   ├── (user-dashboard)/     # Pages restricted to User actions
│   ├── (website)/            # Main website pages (Homepage, Find Properties)
│   ├── globals.css           # Global Tailwind and Ant Design styles
│   └── layout.tsx            # Global HTML shell wrapper
│
├── components/               # UI PRESENTATION LAYER (Where 100% of UI lives)
│   ├── AgentDashboard/       # Sub-components unique to the Agent panel
│   ├── UserDashboard/        # Sub-components unique to the User panel
│   ├── InfoPages/            # Content elements for static pages (About, Privacy)
│   ├── auth/                 # Form views for Login, Register, Verification
│   ├── layout/               # Header, Footer, Sidebar, and Navigation bars
│   ├── shared/               # Reusable UI parts (Page Headers, Inputs, Cards)
│   ├── ui/                   # Core atomic design primitives (Buttons, Spinners)
│   └── web-pages/            # Main site views (HomePage, FindProperties, details)
│
├── redux/                    # GLOBAL STATE MANAGEMENT (Redux Toolkit)
│   ├── store.ts              # Redux central store configuration
│   └── slices/               # Feature-specific state slices (e.g. subscription)
│
├── helpers/                  # UTILITY FUNCTIONS & API CLIENTS
├── hooks/                    # CUSTOM REACT HOOKS
├── types/                    # GLOBAL TYPESCRIPT INTERFACES
└── Mockdata.ts               # Local demo data arrays
```

---

## 2. Core Architectural Philosophy
To keep integration simple, fast, and bug-free, this project implements a **Strict Separation of Concerns** divided into three main layers:

### A. Lean Page Router (`src/app/`)
* **Rule:** Page routers in `app` must be completely lean. They should **never contain UI designs, forms, or direct styling**.
* **Role:** They act as page setup files that handle:
  1. SEO Metadata (`export const metadata = {...}`)
  2. Route-based layout wrappers
  3. Rendering the main feature component from the `src/components/` folder.
* **Example (`src/app/(user-dashboard)/saved/page.tsx`):**
  ```tsx
  import SaveProperties from "@/components/UserDashboard/saveProperties";
  
  export default function SavedPage() {
      return <SaveProperties />;
  }
  ```

### B. UI Presentation Layer (`src/components/`)
* **Rule:** Presentation components should receive their logic/data from props or hooks.
* **Role:** This is where we build the visual structure, layout styling, CSS animations, and interface actions. By modularizing directories (e.g., `AgentDashboard/` vs `UserDashboard/`), we prevent component leakage and accidental styling clashes.

### C. Logic, State & Integration Layer (`src/redux/`, `src/helpers/`, `src/hooks/`)
* **Rule:** All server calls, local storages, Redux state dispatches, and third-party API integration layers are isolated here.
* **Role:** Centralizes logic so that if you change a database path or an API endpoint, you do not have to touch 10 different UI components to update the visuals.

---

## 3. Best Practices for Smooth Feature Integrations

When you are ready to connect to **APIs (like OpenAI/ChatGPT)** or a **Backend database**, follow these clean-code strategies:

### A. Environment Variables (`.env.local`)
Never hardcode API keys (like Google Map Keys or OpenAI keys) inside any component. Store them in `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://api.myhome.com
NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-xxxxxx
```
* Use `NEXT_PUBLIC_` prefix only for variables that must be accessed on the client-side browser.
* Private backend keys should omit `NEXT_PUBLIC_` so they remain securely protected on the Node server environment.

### B. Centralizing API Requests (API Clients)
Instead of running `fetch()` directly in your frontend UI components, create a central helper client in `src/helpers/api.ts`:
```typescript
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        ...options,
        headers,
    });
    return response.json();
}
```
* **Benefit:** If you need to add an auto-retry queue, a loading spinner trigger, or handle an expired token, you only need to write it once inside this helper file!

### C. Integrating State Changes (Redux Toolkit)
When updating user roles, logging out, or changing subscription levels dynamically:
1. Dispatch actions through Redux slices (`src/redux/slices/`).
2. Centralize state changes so that if a user upgrades their subscription in `src/components/AgentDashboard/Subscription/index.tsx`, the `Sidebar` navigation immediately reacts by enabling restricted dashboard features instantly without requiring a page reload.

---

## 4. Next Steps for Easy Code Cleanup

1. **Move Remaining Business Logic Out of UI Elements:** If you see any component doing heavy calculation or data parsing, move it to `src/helpers/` or a custom React hook in `src/hooks/`.
2. **Use Shared UI Primitives:** Whenever you need a form input, button, loading spinner, or modal, check `src/components/shared/` and `src/components/ui/` first before creating new styles. This keeps the website's brand aesthetic perfectly uniform.
