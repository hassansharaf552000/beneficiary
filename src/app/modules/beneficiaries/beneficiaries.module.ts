import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { BeneficiariesRoutingModule } from './beneficiaries-routing.module';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { ListBeneficiariesComponent } from './components/list-beneficiaries/list-beneficiaries.component';
import { ProfileBeneficiaryComponent } from './components/profile-beneficiary/profile-beneficiary.component';
import { RatingDialogComponent } from './components/rating-dialog/rating-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { MessageService } from 'primeng/api';
import { PendingRequestsComponent } from './components/pending-requests/pending-requests.component';

@NgModule({  declarations: [
    AddBeneficiaryComponent,
    ListBeneficiariesComponent,
    ProfileBeneficiaryComponent,
    RatingDialogComponent,
    PendingRequestsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BeneficiariesRoutingModule,
    SharedModule
  ],
     providers: [
      MessageService,
    ],
})
export class BeneficiariesModule { }
