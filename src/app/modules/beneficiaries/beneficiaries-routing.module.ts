import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBeneficiariesComponent } from './components/list-beneficiaries/list-beneficiaries.component';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { ProfileBeneficiaryComponent } from './components/profile-beneficiary/profile-beneficiary.component';
import { PendingRequestsComponent } from './components/pending-requests/pending-requests.component';
import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';
const routes: Routes = [
   {
    path: 'list',
    component: ListBeneficiariesComponent
  },  {
    path: 'add',
    component: AddBeneficiaryComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'pending-requests',
    component: PendingRequestsComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'profile/:id',
    component: ProfileBeneficiaryComponent,
    canActivate: [authGuard]
  },
   {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiariesRoutingModule { }
