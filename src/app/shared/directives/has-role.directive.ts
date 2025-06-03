import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private currentUserSub!: Subscription;
  private hasView = false;

  @Input('appHasRole') roleOrRoles!: string | string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.currentUserSub = this.auth.currentUser$.subscribe((user) => {
      this.updateView(user ? user.role : null);
    });
  }

  private updateView(userRole: string | null) {
    const neededRoles = Array.isArray(this.roleOrRoles)
      ? this.roleOrRoles
      : [this.roleOrRoles];
    const hasAccess = userRole ? neededRoles.includes(userRole) : false;

    if (hasAccess && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasAccess && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }
}
