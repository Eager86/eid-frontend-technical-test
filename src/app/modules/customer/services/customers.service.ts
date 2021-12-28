import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, mergeMap, Observable, toArray } from 'rxjs';
import { Customer } from '../interfaces/customer';

@Injectable({ providedIn: 'root' })
export class CustomersService {
  private readonly CLIENT_RESOURCES_PATH = '/clients';

  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(`${environment.apiUrl}${this.CLIENT_RESOURCES_PATH}`)
      .pipe(
        mergeMap((response: Customer[]) => response),
        mergeMap((customer: Customer) =>
          this.getExternalResourcesByUrl(customer.subject).pipe(
            map((resource) => {
              const customerCustom = {
                ...customer,
                photo: resource.image_url,
                date: resource.date_added,
              };
              return customerCustom;
            })
          )
        ),
        toArray()
      );
  }

  public getExternalResourcesByUrl(url: string): Observable<any> {
    const urlToProxy = url.slice(-10);
    return this.http.get<any>(urlToProxy);
  }
}
