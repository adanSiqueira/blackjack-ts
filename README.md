<h1 align="center"> Blackjack-ts </h1>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/WebSockets-000000?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

This project is a **full-stack Blackjack game** built entirely with **TypeScript**, designed as a playable application focused on clean architecture, domain modeling, and modern web development.

The application is split into **three main layers**:

- **Domain** → Pure game logic (cards, deck, players, rules)
- **Backend** → API + WebSocket server (Node.js)
- **Frontend** → Graphical user interface (React)

The same domain logic originally built for a CLI version is now reused in a web-based, real-time environment.

---

## Architecture Overview

```

root
├── domain      → Game rules and entities (framework-agnostic)
├── backend     → Server, API, WebSockets
├── frontend    → React UI

```

### Why this structure?

- **Separation of concerns**
- **Reusability of domain logic**
- **Scalable to real multiplayer or persistence**

---

##  Domain Layer (`/domain`)

Contains all **pure game logic**, independent of UI or transport.

- Cards, deck, hand evaluation
- Player and dealer logic
- Game flow and rules
- No HTTP, no WebSockets, no UI code

This layer can be reused by:
- CLI apps
- REST APIs
- WebSocket servers
- Tests

---

## Backend (`/backend`)

Built with **Node.js + TypeScript**.

Responsibilities:
- Expose game actions via **HTTP API**
- Manage real-time gameplay via **WebSockets**
- Hold game state on the server
- Act as a bridge between frontend and domain

Key concepts used:
- Controllers, services, routes
- Centralized game state store
- WebSocket event handling
- Typed request/response contracts

---

## Frontend (`/frontend`)

Built with **React + TypeScript**.

Responsibilities:
- Render cards, hands, bets, and table
- Handle user interactions
- Sync game state in real time via WebSockets
- Communicate with backend via HTTP when needed

Key concepts:
- Functional components
- Custom hooks (`useGame`, `useWebSocket`)
- Typed state and props
- Separation between UI and networking logic

---

## Technologies Used

### Core
- TypeScript
- Node.js

### Backend
- Express.js
- WebSockets
- REST APIs

### Frontend
- React
- Vite
- WebSocket client

---

## Working on

- Multiplayer tables
- Persistent player balance
- Authentication
- Animations and UI polish
- Automated tests
- Deployment (Docker / cloud)

---
