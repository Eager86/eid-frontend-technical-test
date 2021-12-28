import { Component } from '@angular/core';
import { SidenavService } from '../sidenav/services/sidenav.service';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public readonly TITLE_TEXT = 'ElectronicID';

  constructor(private sidenavService: SidenavService) {}

  public toggleSidenav(): void {
    this.sidenavService.toggle();
  }
}
