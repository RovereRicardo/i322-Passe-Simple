import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { FilterBarComponent } from '../../shared/filter-bar/filter-bar.component';
import { FilterState } from '../../shared/filter-bar/filter-bar.models';
import { RecettesService } from './recettes.service';

@Component({
  selector: 'app-recettes',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    SearchBarComponent,
    FilterBarComponent,
    SlicePipe,
  ],
  templateUrl: './recettes.component.html',
  styleUrl: './recettes.component.scss',
})
export class RecettesComponent {
  private readonly svc = inject(RecettesService);

  readonly query = signal('');
  readonly filter = signal<FilterState>({ dateRange: null, regimes: [], cantons: [] });

  readonly filteredRecettes = computed(() => {
    const q = this.query().toLowerCase().trim();
    const { dateRange, regimes, cantons } = this.filter();

    return this.svc.recettes.filter((r) => {
      if (q && !r.titre.toLowerCase().includes(q) && !r.canton.toLowerCase().includes(q)) {
        return false;
      }
      if (dateRange) {
        const year = new Date(r.date).getFullYear();
        if (year < dateRange.from || year > dateRange.to) return false;
      }
      if (regimes.length && !regimes.some((reg) => r.regime.includes(reg))) {
        return false;
      }
      if (cantons.length && !cantons.includes(r.canton)) {
        return false;
      }
      return true;
    });
  });
}
