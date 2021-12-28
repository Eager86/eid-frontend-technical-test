import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentAuthUser = this.authService.currentAuthUser;
    if (currentAuthUser && currentAuthUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentAuthUser.token}`,
          Rol: currentAuthUser.rol as string,
        },
      });
    }
    return next.handle(request);
  }
}
