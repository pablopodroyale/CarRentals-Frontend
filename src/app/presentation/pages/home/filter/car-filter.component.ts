import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './car-filter.component.html',
})
export class CarFilterComponent {
  @Output() filterSubmit = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      carType: [''],
      model: [''],
      location: ['']
    });
  }

  submit() {
    if (this.form.valid) {
      this.filterSubmit.emit(this.form.value);
    }
  }
}
