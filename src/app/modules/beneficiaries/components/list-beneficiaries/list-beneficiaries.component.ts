import { Component, OnInit, ViewChild } from '@angular/core';
import { Beneficiary } from '../../../../core/models/beneficiary.model';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { AuthService } from '../../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-list-beneficiaries',
  templateUrl: './list-beneficiaries.component.html',
  styleUrls: ['./list-beneficiaries.component.scss']
})
export class ListBeneficiariesComponent implements OnInit {
  @ViewChild('dt') table!: Table;
  
  beneficiaries: Beneficiary[] = [];
  loading = false;

  searchName: string = '';
  searchBudget: number | null = null;

  showRatingDialog = false;
  selectedBeneficiary: Beneficiary | null = null;

  constructor(
    private beneficiaryService: BeneficiaryService,
    public auth: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadBeneficiaries();
  }
  loadBeneficiaries(): void {
    this.loading = true;
    this.beneficiaryService.getAllBeneficiaries().subscribe({
      next: (data) => {
        this.beneficiaries = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearchName(): void {
    this.table.filter(this.searchName, 'name', 'contains');
  }

  onSearchBudget(): void {
    if (this.searchBudget !== null && this.searchBudget !== undefined) {
      this.table.filter(this.searchBudget, 'budget', 'gte');
    } else {
      this.table.filter(null, 'budget', 'gte');
    }
  }
  clearFilters(): void {
    this.searchName = '';
    this.searchBudget = null;
    this.table.clear();
  }

  get hasActiveFilters(): boolean {
    return this.searchName.trim() !== '' || (this.searchBudget !== null && this.searchBudget !== undefined);
  }
  getAverageRating(beneficiary: Beneficiary): number {
    if (!beneficiary.ratings.numberOfRatings) return 0;
    const average = beneficiary.ratings.totalScore / beneficiary.ratings.numberOfRatings;
    return Math.min(average, 5.0);
  }
  getStarsArray(rating: number): number[] {
    const stars = Math.min(Math.floor(rating), 5); 
    return Array(Math.max(stars, 0)).fill(0); 
  }

  getEmptyStarsArray(rating: number): number[] {
    const stars = Math.min(Math.floor(rating), 5); 
    const emptyStars = 5 - Math.max(stars, 0); 
    return Array(Math.max(emptyStars, 0)).fill(0); 
  }

  openRatingDialog(beneficiary: Beneficiary): void {
    if (!this.auth.isLoggedIn()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Authentication Required',
        detail: 'You must be logged in to rate beneficiaries.'
      });
      return;
    }

    if (!this.auth.hasRole('Beneficiary')) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Access Denied',
        detail: 'Only beneficiaries can rate other beneficiaries.'
      });
      return;
    }

    if (this.auth.currentUser?.id === beneficiary.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Action',
        detail: 'You cannot rate yourself.'
      });
      return;
    }

    this.selectedBeneficiary = beneficiary;
    this.showRatingDialog = true;
  }

  closeRatingDialog(): void {
    this.showRatingDialog = false;
    this.selectedBeneficiary = null;
  }

  onRatingSubmitted(): void {
    this.closeRatingDialog();
    this.loadBeneficiaries();
  }
}