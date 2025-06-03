import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LanguageToggleComponent } from './components/language-toggle/language-toggle.component';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { HasRoleDirective } from './directives/has-role.directive';
import { HighlightOnDirective } from './directives/highlight-on.directive';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({  declarations: [
    NavbarComponent,
    FooterComponent,
    NotfoundComponent,
    SpinnerComponent,    LanguageToggleComponent,
    SearchPipe,
    SortPipe,
    HasRoleDirective,
    HighlightOnDirective,
    MainLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],  exports: [
    LanguageToggleComponent,
    NavbarComponent,
    FooterComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    TranslateModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,    DropdownModule,
    RatingModule,
    CardModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    SearchPipe,
    SortPipe,
    HasRoleDirective,
    HighlightOnDirective
  ]
})
export class SharedModule { }
