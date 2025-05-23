import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsEditComponent } from './rentals-edit.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('EditComponent', () => {
  let component: RentalsEditComponent;
  let fixture: ComponentFixture<RentalsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalsEditComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'mock-id'
              }
            }
          }
        }
      ]
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
