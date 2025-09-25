# 🌳 Root Goal-Based Creating System – Treeffiency

## Overview

This repository is the **Root** of _Treeffiency_.  
It serves as the **main navigation hub** and **entry point** to all other project modules.

- All functionality **requires Root**, and it is the foundation for the system.
- Most modules also **require Tree**, which powers the structural and data layer.
- _(Even Root itself depends on Tree for authentication!)_ Root is only a frontend.

---

## Core Responsibilities

- 🔑 **Accounts** – Centralized login and unified session management across subdomains.
- 🗂 **Main Navigation** – Directs users to every module in the ecosystem.
- 🌉 **Integration Layer** – Connects Tree with all other modules for smooth operation.

> Without Root, the rest of _Treeffiency_ cannot function.

---

## Dependencies

### Required

- **Tree** → Provides the login/authentication endpoint and core data structure.

### Optional Enhancements

- Other branches (apps and modules) can be enabled once **Root + Tree** are active.

---

## Related Modules

- 🌱 **Tree** – Full tree editing, hierarchical data, and API functions.
- ✨ **Be** – A user-focused app that turns tree leaves into single-task focus points. LLM-powered. Minimal UI.

---

## Getting Started

1. **Clone Root** (this repo) and run the React Frontend (npm run dev).
2. **Clone and set up Tree** (required for authentication), run the server/serverhttp.js, and frontend/React Frontend (npm run dev)
3. **Enable additional branches** depending on your use case.
4. **Log in through Root** to unlock the full system.
