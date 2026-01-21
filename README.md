<h1 align="center">Blackjack-ts</h1>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/WebSockets-000000?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

<p align="center">
  A Blackjack game built entirely with <strong>TypeScript</strong>, featuring clean architecture,
  reusable domain logic, real-time gameplay, and a production deployment.
</p>

<p align="center">
  🔗 <strong>Live Demo:</strong> https://blackjack-ts.onrender.com
</p>

---

##  Project Overview

**Blackjack-ts** is a **web implementation of the Blackjack card game**, designed not just as a playable game, but as a **software architecture showcase**.

The application is split into **three main layers**:

- **Domain** → Pure game logic (cards, deck, players, rules)
- **Backend** → API + WebSocket server (Node.js)
- **Frontend** → Graphical user interface (React)

The project emphasizes:

- Clean separation of concerns
- Domain-driven design principles
- Type safety across the entire stack
- Real-time communication using WebSockets
- A production-ready deployment

The same domain logic originally developed for a CLI version is reused in a web-based, real-time environment without modification.

---

##  Architecture Overview

```

root
├── domain      → Pure game rules and entities
├── backend     → HTTP API + WebSocket server
├── frontend    → React UI (Vite)

```

```text
┌─────────────────────────┐
│        Frontend         │
│  React + TypeScript     │
│  (Vite)                 │
│                         │
│  - UI Components        │
│  - Custom Hooks         │
│  - WebSocket Client     │
│  - REST Client          │
└───────────┬─────────────┘
            │
   HTTP API │        WebSocket
            │
┌───────────▼─────────────┐
│         Backend         │
│  Node.js + TypeScript   │
│  Express + WS           │
│                         │
│  - Controllers          │
│  - Routes               │
│  - WebSocket Server     │
│  - Game State Store     │
└───────────┬─────────────┘
            │
            │ Calls domain logic
            │
┌───────────▼─────────────┐
│          Domain         │
│   Pure TypeScript       │
│                         │
│  - Cards / Deck         │
│  - Players / Dealer     │
│  - Game Rules           │
│  - Hand Evaluation      │
│                         │
│  (Framework-agnostic)   │
└─────────────────────────┘
```

### Why this structure?

- **Domain logic is isolated** and reusable
- **Backend acts as an orchestrator**, not a rule holder
- **Frontend focuses only on UI and interaction**
- Enables future scalability:
  - Multiplayer tables
  - Persistence
  - Authentication
  - Mobile or CLI clients

This mirrors real-world backend/frontend/domain separation used in production systems.

---

## Domain Layer (`/domain`)

The domain layer contains **all Blackjack rules and entities**, fully independent from any framework or transport.

Includes:
- Card and deck modeling
- Hand evaluation logic
- Player and dealer behavior
- Game flow and rule enforcement

Key characteristics:
- No HTTP
- No WebSockets
- No React
- No infrastructure code

---

## 🔧 Backend (`/backend`)

Built with **Node.js + TypeScript**.

Responsibilities:
- Expose game actions via a **REST API**
- Manage real-time gameplay via **WebSockets**
- Maintain authoritative game state on the server
- Bridge communication between frontend and domain

Key concepts implemented:
- Express routing and controllers
- Typed request/response contracts
- Centralized in-memory game state
- WebSocket event lifecycle management

The backend does **not** contain game rules — it delegates all logic to the domain layer.

---

## Frontend (`/frontend`)

Built with **React + TypeScript**, bundled with **Vite**.

Responsibilities:
- Render the Blackjack table, cards, and game state
- Handle player interactions (hit, stand, start game, etc.)
- Synchronize state with the backend via WebSockets
- Trigger HTTP requests when needed (game initialization, resets)

Key concepts:
- Functional components
- Custom hooks (`useGame`, `useWebSocket`)
- Typed state and props
- Clear separation between UI and networking logic

The UI is intentionally simple for now, with plans for further polish and animations.

---

## Technical Decisions 

### 1️⃣ Full TypeScript Across the Stack

**Decision:**
Use TypeScript in **domain, backend, and frontend**.

**Why:**

* End-to-end type safety
* Shared mental model across layers
* Fewer runtime errors
* Better refactoring and scalability

**Trade-off:**
Slightly higher upfront complexity, but worth it for maintainability.

---

### 2️⃣ Domain-First Architecture (Framework-Agnostic Core)

**Decision:**
Extract all game rules into a standalone `/domain` package.

**Why:**

* Business rules are the most valuable part of the system
* Domain logic should not depend on frameworks
* Enables reuse across:

  * CLI
  * Backend
  * Tests
  * Future services

**Result:**
The backend becomes an **orchestrator**, not a rule holder.

---

### 3️⃣ Backend as the Authoritative Game State

**Decision:**
Store and manage game state exclusively on the server.

**Why:**

* Prevents client-side cheating
* Enables real multiplayer in the future
* Simplifies synchronization logic
* Matches real-world multiplayer game architecture

**Alternative considered:**
Client-side state with validation — rejected due to consistency and security concerns.

---

### 4️⃣ WebSockets for Real-Time Gameplay

**Decision:**
Use WebSockets instead of polling or HTTP-only updates.

**Why:**

* Blackjack is event-driven
* Immediate feedback improves UX
* Scales naturally to multiplayer tables
* Matches real-time system design patterns

**Usage:**

* Player actions → server
* State updates → broadcast to client(s)

---

### 5️⃣ REST + WebSockets (Hybrid Communication)

**Decision:**
Use both REST and WebSockets instead of only one.

**Why:**

* REST is ideal for:

  * Health checks
  * Game initialization
  * Stateless operations
* WebSockets are ideal for:

  * Continuous game updates
  * Real-time interaction

This avoids forcing one protocol to do everything.

---

### 6️⃣ Explicit HTTP Server Creation

**Decision:**
Create the HTTP server manually instead of relying on `app.listen()`.

```ts
const server = http.createServer(app);
initGameSocket(server);
```

**Why:**

* Required for clean WebSocket integration
* Enables future protocol-level configuration
* Aligns with production Node.js patterns

---

### 7️⃣ Environment-Based Configuration (Vite + Render)

**Decision:**
Use environment variables for API and WebSocket URLs.

**Why:**

* Clean separation between local and production environments
* No hardcoded URLs
* Avoids common deployment pitfalls

This decision directly solved the production bug encountered during deployment.

---

### 8️⃣ Single Deployment, Multiple Concerns

**Decision:**
Deploy frontend and backend under the same public domain on Render.

**Why:**

* Simplifies CORS
* Simplifies WebSocket configuration
* Reduces operational overhead
* Ideal for small-to-medium applications

**Scales later to:**
Separate services, Docker, or microservices if needed.

---

## Environment Variables & Configuration

The project uses **environment variables** to correctly separate local development and production environments.

### Frontend (`Vite`)

Local development (`.env`, not committed):
```env
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
````

Production (configured on Render):

```env
VITE_API_URL=https://blackjack-ts.onrender.com/api
VITE_WS_URL=https://blackjack-ts.onrender.com
```

---

## Deployment

The application is deployed on **Render** as a **full-stack service**.

* Single public URL serving both frontend and backend
* Backend listens on the port provided by Render
* Frontend build served as static assets
* WebSockets enabled and working in production
* Environment variables configured via Render dashboard

🔗 **Live URL:** [https://blackjack-ts.onrender.com](https://blackjack-ts.onrender.com)

---

## ▶ Running Locally

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

### Install dependencies

```bash
npm install
```

### Start backend

```bash
cd backend
npm run dev
```

### Start frontend

```bash
cd frontend
npm run dev
```

Make sure the frontend `.env` file is configured correctly for local development.

---

## Technologies Used

### Core

* TypeScript
* Node.js

### Backend

* Express.js
* WebSockets
* REST APIs

### Frontend

* React
* Vite
* WebSocket client

---