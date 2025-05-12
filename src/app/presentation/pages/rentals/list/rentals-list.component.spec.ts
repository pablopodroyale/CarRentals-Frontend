import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsListComponent } from './rentals-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('RentalsListComponent', () => {
  let component: RentalsListComponent;
  let fixture: ComponentFixture<RentalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalsListComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
