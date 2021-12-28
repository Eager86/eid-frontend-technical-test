import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, body, headers } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(2000)) // Retardo para simular la respuesta del servidor
      .pipe(dematerialize());

    function handleRoute() {
      return url.endsWith(environment.authPath) && method === 'POST'
        ? authenticate()
        : url.endsWith(environment.authMetadataPath) && method === 'GET'
        ? metadata()
        : next.handle(request);
    }

    function authenticate() {
      const { username, password } = body;
      const auth =
        (username === 'electronicid' && password === 'Electronicid') ||
        (username === 'administrador' && password === 'Administrador');

      // En el caso de no existir coincidencias devolvemos error
      if (!auth) return error('Username or password is incorrect');

      const user = ok({
        rol: 'User',
        token: 'fake-jwt-token',
      });

      const admin = ok({
        rol: 'Admin',
        token: 'fake-jwt-token',
      });

      return username === 'electronicid' ? user : admin;
    }

    function metadata() {
      const rol = headers.get('Rol');
      const user = ok({
        permissions: [
          {
            module_name: 'customers',
            // actions
            show_action: false,
          },
        ],
      });

      const admin = ok({
        permissions: [
          {
            module_name: 'customers',
            // actions
            show_action: true,
          },
        ],
      });
      return rol === 'User' ? user : admin;
    }

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError(() => new Error(message));
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
