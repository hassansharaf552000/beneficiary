import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.scss']
})
export class AddBeneficiaryComponent implements OnInit, AfterViewInit {
  @ViewChild('nameInput') nameInputRef!: ElementRef<HTMLInputElement>;

  addForm: FormGroup;
  loading = false;
  submitted = false;
  genders = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  roles = [
    { label: 'Beneficiary', value: 'Beneficiary' },
    { label: 'Admin', value: 'Admin' }
  ];
  constructor(
    private fb: FormBuilder,
    private beneficiaryService: BeneficiaryService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.addForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(18)]],
      gender: [null, Validators.required],
      'contactInfo.email': ['', [Validators.required, Validators.email]],
      'contactInfo.phone': ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(0)]],
      power: [0, [Validators.required, Validators.min(0)]],
      role: ['Beneficiary', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      this.nameInputRef.nativeElement.focus();
    }, 100);
  }

  get f() {
    return this.addForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.addForm.invalid) return;
    this.loading = true;

    const userPayload = {
      username: this.f['username'].value,
      email: this.addForm.get('contactInfo.email')?.value,
      password: this.f['password'].value,
      role: this.f['role'].value as 'Admin' | 'Beneficiary'
    };

    this.authService.createUser(userPayload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: 'User created successfully'
        });
        setTimeout(() => this.router.navigate(['/beneficiaries/list']), 1000);
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Could not create user'
        });
      }
    });
  }
}