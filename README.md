# 📦 Laundry‑Free CMS

*A lightweight CMS built on **Next.js 15** (App Router + React 19), **Material UI v5**, secure session cookies, server actions, SSR, and middleware-based authentication.*

---

## ⚛️ Overview

- Built with **Next.js 15** and React 19  
  (learn more about the async `cookies()` API and React 19 support on #15) :contentReference[oaicite:1]{index=1}  
- Uses **Material UI v5** with full SSR support via Emotion and the `AppRouterCacheProvider` wrapper :contentReference[oaicite:2]{index=2}  
- Authentication via **edge middleware** (`middleware.ts`), setting **HTTP‑Only** cookies before page rendering :contentReference[oaicite:3]{index=3}  
- All pages in `app/` render on the **server**, fetching content via Prisma or REST  
- Forms handled through **Server Actions** to set/delete cookies, securely mutating state before hydration

---

## 🧪 Features

| Capability | Description |
|------------|-------------|
| **Middleware Auth** | Verifies JWT cookie for protected routes; refreshes session and sets updated tokens |
| **Secure HTTP-Only Cookies** | Stores access and refresh tokens; readable only via `cookies()``
| **Server Actions for login/logout** | Auth logic handled server-side; cookies set via Neuro (`cookies().set(...)`) :contentReference[oaicite:4]{index=4} |
| **SSR + MUI** | No FOUC; MUI styles collected & injected before hydration via `AppRouterCacheProvider` :contentReference[oaicite:5]{index=5} |
| **Headless Content API** | CRUD API powered by `app/api/cms/route.ts`, optionally editable via UI |
| **TypeScript & Yup** | Type-safe schemas for content models (e.g. pages, posts, media) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20 (recommended)
- Yarn or npm
- Environment variables:
