import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingServicesComponent } from '../../../presentation/pages/services/upcoming-services.component';
import { HttpClientModule } from '@angular/common/http';

describe('ServicesComponent', () => {
  let component: UpcomingServicesComponent;
  let fixture: ComponentFixture<UpcomingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingServicesComponent, HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
