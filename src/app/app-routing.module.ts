import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { MainLayoutComponent } from './shared/components/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('../app/modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'beneficiaries',
        loadChildren: () =>
          import('../app/modules/beneficiaries/beneficiaries.module').then(
            (m) => m.BeneficiariesModule
          )
      },
      {
        path: '',
        loadChildren: () =>
          import('../app/modules/beneficiaries/beneficiaries.module').then(
            (m) => m.BeneficiariesModule
          )
      },
      { path: '**', component: NotfoundComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
