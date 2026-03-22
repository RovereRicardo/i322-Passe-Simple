# DEV-README — Passe-simple

Developer guide for contributing to and extending the project.

---

## Tech stack

| Layer | Tool | Version |
|---|---|---|
| Framework | Angular (Standalone + Signals) | 21 |
| UI library | Angular Material (M3) | 21 |
| Styling | SCSS + M3 CSS tokens | — |
| Mock API | JSON Server | 0.17.x |
| Language | TypeScript (strict mode) | ~5.9 |

---

## Project structure

```
src/
├── app/
│   ├── features/                    # One folder per page/route
│   │   ├── home/                    # Landing page (3 random recipes)
│   │   ├── recettes/                # Recipe list + filters
│   │   │   ├── recettes.service.ts  # Data layer — HttpClient calls to JSON Server
│   │   │   └── recette-detail/      # Detail page (ingredients + steps)
│   │   ├── faq/
│   │   └── contacts/
│   ├── shared/                      # Reusable components
│   │   ├── search-bar/              # Text search input
│   │   └── filter-bar/              # Époque / Régime / Canton dropdowns
│   │       └── filter-bar.models.ts # FilterState interface + constants
│   ├── app.component.*              # Root shell: toolbar + sidenav
│   ├── app.routes.ts                # All route definitions
│   └── app.config.ts                # Bootstrap providers
├── styles.scss                      # Global M3 theme
└── index.html
```

**Rule**: features live in `features/`, anything used by two or more features lives in `shared/`.

---

## Architecture principles

### Standalone components (no NgModules)

Every component declares its own imports. There are no `*.module.ts` files.

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MatCardModule, RouterLink, SlicePipe], // ← explicit per-component
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
})
export class ExampleComponent {}
```

### Dependency injection with `inject()`

Use `inject()` in the class body instead of constructor parameters.

```typescript
// ✅ correct
export class RecettesComponent {
  private readonly svc = inject(RecettesService);
}

// ❌ avoid
export class RecettesComponent {
  constructor(private svc: RecettesService) {}
}
```

### Signals for state

Use Angular Signals for all local component state. Never use `BehaviorSubject` for simple UI state.

```typescript
readonly query = signal('');           // mutable state
readonly isOpen = signal(false);

// update
this.query.set('fondue');
this.isOpen.update(v => !v);

// derived / computed state — auto-tracks dependencies
readonly results = computed(() =>
  this.allItems().filter(i => i.name.includes(this.query()))
);
```

### Component outputs

Use the new `output()` API instead of `@Output() EventEmitter`.

```typescript
readonly searchChange = output<string>();

// emit
this.searchChange.emit(value);
```

```html
<!-- parent binds to it -->
<app-search-bar (searchChange)="query.set($event)" />
```

---

## Adding a new page

1. Create a feature folder: `src/app/features/my-feature/`
2. Generate the component files (`my-feature.component.ts/html/scss`)
3. Register the route in `app.routes.ts` using `loadComponent`:

```typescript
{
  path: 'my-feature',
  loadComponent: () =>
    import('./features/my-feature/my-feature.component').then(
      (m) => m.MyFeatureComponent
    ),
},
```

4. Add a link in `app.component.html` inside `<mat-nav-list>`:

```html
<a mat-list-item routerLink="/my-feature" routerLinkActive="active-link" (click)="toggleSidenav()">
  <mat-icon matListItemIcon>star</mat-icon>
  <span matListItemTitle>Ma page</span>
</a>
```

All routes are lazy-loaded — the bundle for your page is only fetched when the user navigates to it.

---

## Adding a new recipe

Add the object to the `recettes` array in `db.json`. JSON Server picks it up automatically on the next request (no restart needed if using `--watch`).

```json
{
  "id": 6,
  "titre": "Nom de la recette",
  "canton": "Vaud",
  "date": "1900-01-01",
  "regime": ["Végétarien"],
  "ingredients": ["Ingrédient 1", "Ingrédient 2"],
  "etapes": ["Étape 1", "Étape 2"],
  "anecdote": "Contexte historique…",
  "image": ""
}
```

**Note on `regime` values**: must match the constants in `filter-bar.models.ts` (`'Végétarien'`, `'Sans gluten'`, `'Vegan'`) for filters to work.

---

## Data layer — `RecettesService`

`RecettesService` fetches data from JSON Server via `HttpClient`. The base URL is `http://localhost:3000/recettes`.

```typescript
@Injectable({ providedIn: 'root' })
export class RecettesService {
  private readonly http = inject(HttpClient);
  private readonly BASE = 'http://localhost:3000/recettes';

  // Signal<Recette[]> — populated on service creation, starts as []
  readonly recettes = toSignal(
    this.http.get<Recette[]>(this.BASE),
    { initialValue: [] as Recette[] }
  );

  // Observable — used with switchMap in detail component
  getById(id: number): Observable<Recette> {
    return this.http.get<Recette>(`${this.BASE}/${id}`);
  }
}
```

`HttpClient` is provided in `app.config.ts` via `provideHttpClient()`. **JSON Server must be running** (`npm run mock-api`) for the app to display any data.

---

## Styling

### M3 tokens — always prefer these over hard-coded colours

```scss
// ✅ use semantic tokens
color: var(--mat-sys-primary);
background-color: var(--mat-sys-surface-container);
color: var(--mat-sys-on-surface-variant);

// ❌ avoid
color: #c62828;
background-color: #f5f5f5;
```

Common tokens:

| Token | Usage |
|---|---|
| `--mat-sys-primary` | Brand colour (red), headings, accents |
| `--mat-sys-on-primary` | Text on primary backgrounds |
| `--mat-sys-surface-variant` | Image placeholders, subtle backgrounds |
| `--mat-sys-surface-container` | Cards, anecdote blocks |
| `--mat-sys-on-surface-variant` | Secondary text, captions |
| `--mat-sys-secondary-container` | Active nav item background |
| `--mat-sys-outline-variant` | Borders, dividers |

### Component SCSS scope

Styles in `*.component.scss` are scoped to that component automatically. No need for BEM namespacing or `:host` unless targeting the root element.

### Spacing convention

Use multiples of `8px`: `8px`, `16px`, `24px`, `32px`, `40px`.

---

## Material 3 components — quick reference

| Need | Component | Module |
|---|---|---|
| Page card | `<mat-card appearance="outlined">` | `MatCardModule` |
| Clickable card | Add `matRipple` + `[routerLink]` | `MatRippleModule` |
| Tag / badge | `<mat-chip>` inside `<mat-chip-set>` | `MatChipsModule` |
| Dropdown | `<mat-select>` inside `<mat-form-field>` | `MatSelectModule` |
| Text input | `<input matInput>` inside `<mat-form-field>` | `MatInputModule` |
| Checkbox | `<mat-checkbox>` | `MatCheckboxModule` |
| Accordion | `<mat-expansion-panel>` | `MatExpansionModule` |
| Icon | `<mat-icon>icon_name</mat-icon>` | `MatIconModule` |
| Icon button | `<button mat-icon-button>` | `MatButtonModule` |

Icon names come from [Material Symbols](https://fonts.google.com/icons).

---

## Routing cheat sheet

```
/                → HomeComponent         (3 random recipes)
/recettes        → RecettesComponent     (list + search + filters)
/recettes/:id    → RecetteDetailComponent (ingredients + steps)
/faq             → FaqComponent
/contacts        → ContactsComponent
```

To read a route parameter inside a component:

```typescript
private readonly route = inject(ActivatedRoute);

private readonly id = toSignal(
  this.route.paramMap.pipe(map(p => Number(p.get('id'))))
);
```

---

## Filter system

Filters live in `shared/filter-bar/`. The data flow is:

```
FilterBarComponent
  └─ filterChange output<FilterState>
        └─ RecettesComponent.filter signal
              └─ filteredRecettes computed()
                    └─ template @for loop
```

`FilterState` shape (`filter-bar.models.ts`):

```typescript
interface FilterState {
  dateRange: { from: number; to: number } | null;  // year range
  regimes: string[];                                 // multi-select
  cantons: string[];                                 // multi-select
}
```

To add a new filter dimension (e.g. difficulty):

1. Add the field to `FilterState` in `filter-bar.models.ts`
2. Add a constant array for the options
3. Add a `mat-select` + signal + handler in `FilterBarComponent`
4. Add the filter condition in the `computed()` in `RecettesComponent`

---

## Common pitfalls

**French apostrophes in TypeScript strings**
The typographic apostrophe `'` (U+2019) breaks single-quoted strings. Use template literals for any string containing French text with apostrophes.

```typescript
// ❌ breaks
question: 'Qu'est-ce que…'

// ✅ works
question: `Qu'est-ce que…`
```

**Pipes in standalone components**
`SlicePipe`, `DatePipe`, `AsyncPipe` etc. must be explicitly imported.

```typescript
imports: [SlicePipe, DatePipe] // ← don't forget these
```

**`output()` vs `@Output()`**
This project uses the newer `output()` function. Don't mix styles.

```typescript
// ✅ this project's style
readonly myEvent = output<string>();

// ❌ old style — don't add
@Output() myEvent = new EventEmitter<string>();
```

---

## Commands

```bash
npm install                              # Install dependencies
npm start                                # Angular dev server → localhost:4200
npm run mock-api                         # JSON Server → localhost:3000
npx concurrently "npm run mock-api" "npm start"   # Both at once
npm run build                            # Production build
npm run lint                             # TypeScript lint
```
