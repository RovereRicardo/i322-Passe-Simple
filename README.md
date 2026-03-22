# Passe-simple

Magazine suisse d'histoire et de culture — application Angular avec API mock JSON Server.

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm v9 ou supérieur

## Installation

```bash
npm install
```

## Lancer l'application

Les deux serveurs doivent tourner **simultanément** dans deux terminaux séparés.

### Terminal 1 — API mock (JSON Server)

```bash
npx json-server --watch db.json --port 3000
```

JSON Server démarre sur `http://localhost:3000`. Les routes sont générées automatiquement depuis les clés de `db.json` :

| Endpoint | Description |
|---|---|
| `GET /recettes` | Liste toutes les recettes |
| `GET /recettes/:id` | Détail d'une recette |
| `POST /recettes` | Créer une recette |
| `PUT /recettes/:id` | Remplacer une recette |
| `PATCH /recettes/:id` | Modifier une recette |
| `DELETE /recettes/:id` | Supprimer une recette |
| `GET /recettes?canton=Valais` | Filtre par canton |
| `GET /recettes?regime_like=végétarien` | Filtre par régime alimentaire |

> Ajouter une nouvelle clé dans `db.json` (ex. `"faq": []`) expose instantanément un nouvel endpoint `/faq`.

### Terminal 2 — Application Angular

```bash
ng serve
```

L'application démarre sur `http://localhost:4200`.

> Si `ng` n'est pas disponible globalement, utilisez `npx ng serve`.

---

## Lancer les deux serveurs avec un seul terminal (optionnel)

```bash
npm install --save-dev concurrently
npx concurrently "npx json-server --watch db.json --port 3000" "ng serve"
```

---

## Pages et routes Angular

| Route | Page |
|---|---|
| `/` | Accueil — 3 recettes aléatoires |
| `/recettes` | Liste complète avec recherche et filtres |
| `/recettes/:id` | Détail d'une recette |
| `/faq` | Foire aux questions |
| `/contacts` | Contact de la rédaction |

---

## Structure du projet

```
passe-simple/
├── src/
│   └── app/
│       ├── features/
│       │   ├── home/               # Page d'accueil (3 recettes aléatoires)
│       │   ├── recettes/           # Liste, filtres et détail des recettes
│       │   │   └── recette-detail/ # Page détail (ingrédients + étapes)
│       │   ├── faq/                # Foire aux questions
│       │   └── contacts/           # Page de contact
│       └── shared/
│           ├── search-bar/         # Champ de recherche textuelle
│           └── filter-bar/         # Filtres par époque, régime et canton
├── db.json                         # Données mock (5 recettes suisses)
├── angular.json
└── package.json
```

## Scripts npm

| Commande | Description |
|---|---|
| `npm start` | Lance l'application Angular (`ng serve`) |
| `npm run mock-api` | Lance JSON Server sur le port 3000 |
| `npm run build` | Compile l'application pour la production |
| `npm run lint` | Analyse statique du code TypeScript |
