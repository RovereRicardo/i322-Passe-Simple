import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export interface Recette {
  id: number;
  titre: string;
  canton: string;
  date: string;
  regime: string[];
  ingredients: string[];
  etapes: string[];
  anecdote: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class RecettesService {
  private readonly http = inject(HttpClient);
  private readonly BASE = 'http://localhost:3000/recettes';

  readonly recettes = toSignal(
    this.http.get<Recette[]>(this.BASE),
    { initialValue: [] as Recette[] }
  );

  getById(id: number): Observable<Recette> {
    return this.http.get<Recette>(`${this.BASE}/${id}`);
  }
}
