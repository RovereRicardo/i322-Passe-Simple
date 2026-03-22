import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { Recette, RecettesService } from '../recettes/recettes.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    SlicePipe,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatRippleModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly svc = inject(RecettesService);

  private readonly _featured = computed(() => this.pickRandom(3));
  get featured(): Recette[] { return this._featured(); }

  private pickRandom(n: number) {
    const shuffled = [...this.svc.recettes()].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }
}
