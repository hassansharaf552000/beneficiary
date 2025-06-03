import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Beneficiary } from '../../../../core/models/beneficiary.model';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { AuthService } from '../../../../core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent {
  @Input() visible = false;
  @Input() beneficiary: Beneficiary | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() ratingSubmitted = new EventEmitter<void>();

  ratingValue = 0;
  loading = false;

  constructor(
    private beneficiaryService: BeneficiaryService,
    private auth: AuthService,
    private messageService: MessageService
  ) {}  get averageRating(): number {
    if (!this.beneficiary?.ratings.numberOfRatings) return 0;
    const average = this.beneficiary.ratings.totalScore / this.beneficiary.ratings.numberOfRatings;
    return Math.min(average, 5.0); 
  }

  get averageRatingFloor(): number {
    return Math.min(Math.floor(this.averageRating), 5);
  }

  onRatingChange(event: any): void {
    this.ratingValue = event.value;
  }

  submitRating(): void {
    if (!this.beneficiary || this.ratingValue === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Rating',
        detail: 'Please select a rating before submitting.'
      });
      return;
    }

    this.loading = true;
    this.beneficiaryService
      .rateBeneficiary(this.auth.currentUser!.id, this.beneficiary.id, this.ratingValue)
      .subscribe({
        next: () => {
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Rating Submitted',
            detail: `You rated ${this.beneficiary!.name} ${this.ratingValue} star(s).`
          });
          this.ratingSubmitted.emit();
          this.closeDialog();
        },
        error: (err) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message || 'Could not submit rating'
          });
        }
      });
  }

  closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.ratingValue = 0;
  }
}
