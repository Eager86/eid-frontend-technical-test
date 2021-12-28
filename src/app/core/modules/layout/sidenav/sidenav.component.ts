import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../auth/services/auth.service';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'core-menu-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements AfterViewInit {
  @ViewChild('sidenav') public sidenav!: MatSidenav;

  public readonly CLIENTS_TEXT = 'Clientes';
  public readonly LOGOUT_TEXT = 'Logout';

  constructor(
    private sidenavService: SidenavService,
    private authService: AuthService
  ) {}

  public ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  public logout(): void {
    this.authService.logout();
  }
}
