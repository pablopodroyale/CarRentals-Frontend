import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';
import {
  MostRentedCarDto,
  UtilizationDto,
  DailySummaryDto
} from 'src/app/core/models/statistics/statistics.model';
import { StatisticsService } from 'src/app/infraestructure/services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgChartsModule],
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {
  form: FormGroup<{ from: FormControl<string>; to: FormControl<string> }>;
  topCars: MostRentedCarDto[] = [];
  utilization: UtilizationDto[] = [];
  dailySummary: DailySummaryDto[] = [];

  constructor(private statisticsService: StatisticsService) {
    this.form = new FormGroup({
      from: new FormControl(this.getDefaultFromDate(), { nonNullable: true }),
      to: new FormControl(this.getToday(), { nonNullable: true })
    });
  }

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): void {
    const from = this.form.controls.from.value;
    const to = this.form.controls.to.value;

    this.statisticsService.getMostRented(from, to).subscribe({
      next: data => this.topCars = data,
      error: err => console.error('Error loading top cars', err)
    });

    this.statisticsService.getUtilization(from, to).subscribe({
      next: data => this.utilization = data,
      error: err => console.error('Error loading utilization', err)
    });

    this.statisticsService.getDailySummary(7).subscribe({
      next: data => this.dailySummary = data,
      error: err => console.error('Error loading daily summary', err)
    });
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  getDefaultFromDate(): string {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
  }
}
