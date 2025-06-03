import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Beneficiary } from '../../../../core/models/beneficiary.model';


@Component({
  selector: 'app-profile-beneficiary',
  templateUrl: './profile-beneficiary.component.html',
  styleUrls: ['./profile-beneficiary.component.scss']
})
export class ProfileBeneficiaryComponent implements OnInit {
  beneficiary: Beneficiary | null = null;
  loading = false;
  currentUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private beneficiaryService: BeneficiaryService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.currentUserId = this.auth.currentUser?.id || null;
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.beneficiaryService.getBeneficiaryById(id).subscribe({
      next: (data) => {
        this.beneficiary = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }  get averageRating(): number {
    if (!this.beneficiary?.ratings.numberOfRatings) return 0;
    const average = this.beneficiary.ratings.totalScore / this.beneficiary.ratings.numberOfRatings;
    return Math.min(average, 5.0); 
  }
  getStarsArray(): number[] {
    const rating = Math.min(Math.floor(this.averageRating), 5); 
    return Array(Math.max(rating, 0)).fill(0); 
  }

  getEmptyStarsArray(): number[] {
    const rating = Math.min(Math.floor(this.averageRating), 5);
    const emptyStars = 5 - Math.max(rating, 0);
    return Array(Math.max(emptyStars, 0)).fill(0);
  }
}