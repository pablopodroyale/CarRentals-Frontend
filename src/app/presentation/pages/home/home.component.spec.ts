import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CarService } from '../../../infraestructure/services/car/car.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const carServiceMock = {
      getAvailableCars: jasmine.createSpy().and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: CarService, useValue: carServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
