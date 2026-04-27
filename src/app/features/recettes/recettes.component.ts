import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { FilterBarComponent } from '../../shared/filter-bar/filter-bar.component';
import { DateRange, FilterState } from '../../shared/filter-bar/filter-bar.models';
import { RecettesService } from './recettes.service';

@Component({
  selector: 'app-recettes',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatChipsModule,
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
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly initialQuery: string = this.route.snapshot.queryParams['q'] ?? '';
  readonly initialFilter: FilterState = this.parseInitialFilter();

  readonly query = signal(this.initialQuery);
  readonly filter = signal<FilterState>(this.initialFilter);

  readonly filteredRecettes = computed(() => {
    const q = this.query().toLowerCase().trim();
    const { dateRange, regimes, cantons } = this.filter();

    return this.svc.recettes().filter((r) => {
      if (q && !r.titre.toLowerCase().includes(q) && !r.canton.toLowerCase().includes(q)) {
        return false;
      }
      if (dateRange) {
        const year = new Date(r.date).getFullYear();
        if (year < dateRange.from || year > dateRange.to) return false;
      }
      if (regimes.length && !regimes.some((reg) => r.regime.some((rv) => rv.toLowerCase() === reg.toLowerCase()))) {
        return false;
      }
      if (cantons.length && !cantons.includes(r.canton)) {
        return false;
      }
      return true;
    });
  });

  constructor() {
    effect(() => {
      const q = this.query();
      const { dateRange, regimes, cantons } = this.filter();
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          q: q || null,
          date: dateRange ? `${dateRange.from}_${dateRange.to}` : null,
          regimes: regimes.length ? regimes.join(',') : null,
          cantons: cantons.length ? cantons.join(',') : null,
        },
        replaceUrl: true,
      });
    });
  }

  private parseInitialFilter(): FilterState {
    const p = this.route.snapshot.queryParams;
    const dateParam: string | undefined = p['date'];
    let dateRange: DateRange | null = null;
    if (dateParam) {
      const [from, to] = dateParam.split('_').map(Number);
      if (!isNaN(from) && !isNaN(to)) dateRange = { from, to };
    }
    const regimes: string[] = p['regimes'] ? p['regimes'].split(',').filter(Boolean) : [];
    const cantons: string[] = p['cantons'] ? p['cantons'].split(',').filter(Boolean) : [];
    return { dateRange, regimes, cantons };
  }
}
