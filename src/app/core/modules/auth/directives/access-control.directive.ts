import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AccessControl } from '../interfaces/access-control';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[accessControl]',
})
export class AccessControlDirective implements OnInit {
  @Input('moduleType') moduleType: string | undefined;
  @Input('accessType') accessType: string | undefined;
  constructor(private elementRef: ElementRef, private auth: AuthService) {}

  public ngOnInit(): void {
    this.elementRef.nativeElement.style.display = 'none';
    this.checkAccess();
  }

  private checkAccess(): void {
    const accessControls: any = this.auth.getAccessControl;
    const module: any = accessControls.permissions.find(
      (access: AccessControl) => access.module_name === this.moduleType
    );
    this.elementRef.nativeElement.style.display = module[this.accessType!]
      ? ''
      : 'none';
  }
}
