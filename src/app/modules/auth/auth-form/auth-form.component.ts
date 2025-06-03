import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;  loading = false;
  submitted = false;
  returnUrl: string = '/';
  isRightPanelActive = false;
  showLoginPassword = false;
  showRegisterPassword = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    if (this.router.url.includes('register')) {
      this.isRightPanelActive = true;
    }
    
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        document.querySelector('.container')?.classList.add('loaded');
      }, 100);
    }
  }

  get loginControls() {
    return this.loginForm.controls;
  }
  get registerControls() {
    return this.registerForm.controls;
  }

  toggleLoginPasswordVisibility(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  toggleRegisterPasswordVisibility(): void {
    this.showRegisterPassword = !this.showRegisterPassword;
  }toggleToSignUp(): void {
    this.addTransitionClass();
    this.isRightPanelActive = true;
    this.submitted = false; 
    this.registerForm.reset(); 
  }

  toggleToSignIn(): void {
    this.addTransitionClass();
    this.isRightPanelActive = false;
    this.submitted = false;
    this.loginForm.reset();
  }

  onLoginSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    this.loading = true;

    this.auth
      .login(this.loginControls['username'].value, this.loginControls['password'].value)
      .subscribe({
        next: () => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (err) => {
          this.loading = false;
          console.error('Login error:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: err.error?.message || 'Invalid credentials'
          });
        }
      });
  }

  onRegisterSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) return;
    this.loading = true;

    this.auth
      .registerBeneficiary({
        username: this.registerControls['username'].value,
        email: this.registerControls['email'].value,
        password: this.registerControls['password'].value
      })
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Registered',
            detail: 'Registration successful. Awaiting Admin approval.'
          });
          setTimeout(() => {
            this.toggleToSignIn();
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          console.error('Registration error:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: err.error?.message || 'Could not register'
          });
        }
      });
  }
  private addTransitionClass(): void {
    if (isPlatformBrowser(this.platformId)) {
      const container = document.querySelector('.container');
      container?.classList.add('transitioning');
      
      setTimeout(() => {
        container?.classList.remove('transitioning');
      }, 800);
    }
  }
}
