import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { RecettesService } from '../recettes/recettes.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    SlicePipe,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly svc = inject(RecettesService);

  readonly featured = this.pickRandom(3);

  private pickRandom(n: number) {
    const shuffled = [...this.svc.recettes].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }
}
