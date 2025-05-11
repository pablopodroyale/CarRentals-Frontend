import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsEditComponent } from './rentals-edit.component';

describe('EditComponent', () => {
  let component: RentalsEditComponent;
  let fixture: ComponentFixture<RentalsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
