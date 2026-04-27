import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  readonly initialQuery = input<string>('');
  readonly searchQuery = signal('');
  readonly searchChange = output<string>();

  ngOnInit(): void {
    this.searchQuery.set(this.initialQuery());
  }

  onQueryChange(value: string): void {
    this.searchQuery.set(value);
    this.searchChange.emit(value);
  }
}
