import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../infraestructure/services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should call login and navigate on success', fakeAsync(() => {
    component.form.setValue({ email: 'test@example.com', password: '123456' });
    authServiceSpy.login.and.returnValue(of({ token: 'fake-jwt-token' }));

    component.submit();
    tick();

    expect(authServiceSpy.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456'
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/rentals']);
    expect(component.error).toBe('');
  }));

  it('should show error on login failure', fakeAsync(() => {
    component.form.setValue({ email: 'fail@example.com', password: 'wrong' });
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Unauthorized')));

    component.submit();
    tick();

    expect(component.error).toBe('Credenciales inválidas');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));

  it('should not submit if form is invalid', () => {
    component.form.setValue({ email: '', password: '' });
    component.submit();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
