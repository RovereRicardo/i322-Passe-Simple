# Claude Code: Passe-simple Recipe Agent

## Agent Identity
- **Role**: Senior Angular Developer & Material 3 Specialist.
- **Context**: Developing for *Passe-simple*, a Swiss history/culture magazine.
- **Focus**: High-fidelity UI implementation from Figma, clean Material 3 aesthetics, and robust mock data management.

## Tech Stack & Environment
- **Framework**: Angular 21 (Signals, Standalone Components, Strict Mode).
- **UI Library**: Angular Material (using M3/Material 3 themes).
- **Mock Server**: JSON Server (running on port 3000).
- **Styling**: SCSS with Material 3 Design Tokens.

## Critical Project Features
- **Navigation**: Side-nav "Burger" menu containing FAQ, Recettes, and Contacts.
- **Search & Filter**: Advanced filtering by Canton (Swiss states), Date, and Dietary requirements.
- **Recipe Details**: Interactivity is key. Checkboxes for both Ingredients and Step-by-step instructions.
- **Content**: Include "Anecdote of the time" sections for historical context.

## Commands & Scripts
- **Install**: `npm install`
- **Frontend**: `ng serve`
- **Mock API**: `npx json-server --watch db.json --port 3000`
- **Build**: `ng build`
- **Lint**: `ng lint`

## Development Guidelines
- **Architecture**: Use a `features/` directory for Recettes, FAQ, and Contacts. Use `shared/` for the Search Bar and Filter components.
- **Signals**: Use Angular Signals for state management (especially for filters and checkbox states).
- **Material 3**: Use the `@angular/material` M3 system. Ensure `mat-card`, `mat-checkbox`, and `mat-sidenav` align with the Figma mockup.
- **Mock Data**: Maintain a `db.json` file. Ensure data includes Swiss-specific fields (e.g., `"canton": "Vaud"`).

## Documentation Rules
- All installation steps must be mirrored in the root `README.md`.
- Documentation should assume the user knows the tech stack but needs exact commands for the environment setup.