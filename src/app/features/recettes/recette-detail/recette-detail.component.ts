import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RecettesService } from '../recettes.service';
import { NotFoundComponent } from '../../not-found/not-found.component';

@Component({
  selector: 'app-recette-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatCheckboxModule,
    SlicePipe,
    NotFoundComponent,
  ],
  templateUrl: './recette-detail.component.html',
  styleUrl: './recette-detail.component.scss',
})
export class RecetteDetailComponent {
  private readonly svc = inject(RecettesService);
  private readonly route = inject(ActivatedRoute);

  private readonly id = toSignal(
    this.route.paramMap.pipe(map((p) => Number(p.get('id'))))
  );

  readonly recette = computed(() => this.svc.getById(this.id() ?? 0));
}
