import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  DATE_RANGES,
  DateRange,
  FilterState,
  REGIMES,
  SWISS_CANTONS,
} from './filter-bar.models';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent implements OnInit {
  readonly dateRanges = DATE_RANGES;
  readonly regimes = REGIMES;
  readonly cantons = SWISS_CANTONS;

  readonly initialState = input<FilterState>({ dateRange: null, regimes: [], cantons: [] });

  readonly selectedDate = signal<DateRange | null>(null);
  readonly selectedRegimes = signal<string[]>([]);
  readonly selectedCantons = signal<string[]>([]);

  readonly filterChange = output<FilterState>();

  ngOnInit(): void {
    const s = this.initialState();
    this.selectedDate.set(s.dateRange);
    this.selectedRegimes.set(s.regimes);
    this.selectedCantons.set(s.cantons);
  }

  compareDateRange(a: DateRange | null, b: DateRange | null): boolean {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    return a.from === b.from && a.to === b.to;
  }

  onDateChange(value: DateRange | null): void {
    this.selectedDate.set(value);
    this.emit();
  }

  onRegimeChange(value: string[]): void {
    this.selectedRegimes.set(value);
    this.emit();
  }

  onCantonChange(value: string[]): void {
    this.selectedCantons.set(value);
    this.emit();
  }

  private emit(): void {
    this.filterChange.emit({
      dateRange: this.selectedDate(),
      regimes: this.selectedRegimes(),
      cantons: this.selectedCantons(),
    });
  }
}
