import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoreState } from '@core/store/core.reducer';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { authUserClean } from '../../../store/actions/auth.actions';
import { AccessControl } from '../interfaces/access-control';
import { AuthUser } from '../interfaces/auth-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUser: AuthUser | undefined;
  private accessControl: AccessControl[] | undefined;

  private readonly AUTH_STORE_KEY = 'auth';
  private readonly CUSTOMER_ROUTE = 'customer';

  constructor(
    private http: HttpClient,
    private store: Store<CoreState>,
    private router: Router
  ) {
    this.initializeAuthSuscription();
  }

  private initializeAuthSuscription() {
    this.store
      .select(this.AUTH_STORE_KEY)
      .subscribe(({ authUser, accessControl }) => {
        this.authUser = authUser;
        this.accessControl = accessControl;
      });
  }

  public get currentAuthUser(): AuthUser | undefined {
    return this.authUser;
  }

  public get getAccessControl(): AccessControl[] | undefined {
    return this.accessControl;
  }

  public login(username: string, password: string): Observable<AuthUser> {
    return this.http
      .post<AuthUser>(`${environment.apiUrl}${environment.authPath}`, {
        username,
        password,
      })
      .pipe(
        map((authUser) => {
          this.router.navigate([this.CUSTOMER_ROUTE]);
          return authUser;
        })
      );
  }

  public logout(): void {
    this.router.navigate(['/']);
    this.store.dispatch(authUserClean());
  }

  public accessControls() {
    return this.http.get<AccessControl[]>(environment.authMetadataPath).pipe(
      map((accessControl) => {
        return accessControl;
      })
    );
  }
}
