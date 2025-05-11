import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../infraestructure/services/auth/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate'); // ✅ esto va después del TestBed

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should call login and navigate on success', fakeAsync(() => {
    component.form.setValue({ email: 'test@example.com', password: '123456' });

    authServiceSpy.login.and.returnValue(of({
      token: 'fake-jwt-token',
      expiration: new Date().toISOString()
    }));

    component.submit();
    tick();

    expect(authServiceSpy.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456'
    });
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.error).toBe('');
  }));

  it('should show error on login failure', fakeAsync(() => {
    component.form.setValue({ email: 'fail@example.com', password: 'wrong' });

    authServiceSpy.login.and.returnValue(
      throwError(() => new Error('Unauthorized'))
    );

    component.submit();
    tick();

    expect(component.error).toBe('Invalid credentials. Please try again.');
    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('should not submit if form is invalid', () => {
    component.form.setValue({ email: '', password: '' });
    component.submit();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
