import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterRentalComponent } from './rentals-register.component';
import { RentalService } from '../../../infraestructure/services/rental/rental.service';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterRentalComponent', () => {
  let component: RegisterRentalComponent;
  let fixture: ComponentFixture<RegisterRentalComponent>;
  let rentalServiceSpy: jasmine.SpyObj<RentalService>;

  beforeEach(async () => {
    rentalServiceSpy = jasmine.createSpyObj('RentalService', ['registerRental']);

    await TestBed.configureTestingModule({
      imports: [RegisterRentalComponent], // standalone component
      providers: [
        { provide: RentalService, useValue: rentalServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    component.form.setValue({
      customerId: '',
      carType: '',
      model: '',
      startDate: '',
      endDate: ''
    });

    component.submit();

    expect(component.errorMessage).toBe('Please complete all required fields.');
    expect(rentalServiceSpy.registerRental).not.toHaveBeenCalled();
  });

  it('should show error if start date >= end date', () => {
    component.form.setValue({
      customerId: '123',
      carType: 'SUV',
      model: 'Toyota',
      startDate: '2025-05-10',
      endDate: '2025-05-08'
    });

    component.submit();

    expect(component.errorMessage).toBe('Start date must be before end date.');
    expect(rentalServiceSpy.registerRental).not.toHaveBeenCalled();
  });

  it('should submit the form and show confirmation on success', fakeAsync(() => {
    component.form.setValue({
      customerId: '123',
      carType: 'SUV',
      model: 'Toyota',
      startDate: '2025-05-08',
      endDate: '2025-05-10'
    });

    rentalServiceSpy.registerRental.and.returnValue(of('mock-id'));

    component.submit();
    tick();

    expect(rentalServiceSpy.registerRental).toHaveBeenCalled();
    expect(component.confirmationMessage).toBe('Rental confirmed.');
  }));

  it('should show error message on failure', fakeAsync(() => {
    rentalServiceSpy.registerRental.and.returnValue(
      throwError(() => ({ error: { error: 'Server error' } }))
    );

    component.form.setValue({
      customerId: '123',
      carType: 'SUV',
      model: 'Toyota',
      startDate: '2025-05-08',
      endDate: '2025-05-10'
    });

    component.submit();
    tick();

    expect(component.errorMessage).toBe('Server error');
  }));
});
