import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DialogComponent } from '@shared/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CustomersColumnsEnum, NameCompanyEnum } from '../enums/customer';
import { Customer } from '../interfaces/customer';
import {
  customersClear,
  loadCustomers,
} from '../store/actions/customers.actions';
import { CustomersSatateExtends } from '../store/reducers';

@Component({
  selector: 'app-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss'],
})
export class CustomerListPageComponent implements OnDestroy {
  public displayedColumns: string[];
  public dataSource: Customer[] | undefined;
  public customersStored: Customer[] | undefined;
  public isLoaded: boolean | undefined;
  public isLoading: boolean | undefined;

  public readonly LOADING_TEXT = 'Cargando clientes ...';
  public readonly PHOTO_HEADER_TEXT = ' Photo ';
  public readonly USER_HEADER_TEXT = ' User ';
  public readonly EMAIL_HEADER_TEXT = ' Email ';
  public readonly POST_HEADER_TEXT = ' Post ';
  public readonly DATE_HEADER_TEXT = ' Date ';

  private readonly WIDTH_DIALOG = '275px';

  private readonly CUSTOMERS_STORE_KEY = 'customers';
  private storeSuscription: Subscription | undefined;

  constructor(
    public dialog: MatDialog,
    private store: Store<CustomersSatateExtends>,
    private toast: ToastrService
  ) {
    this.displayedColumns = this.initializeDisplayedColumns();
  }

  private initializeDisplayedColumns(): string[] {
    return [
      CustomersColumnsEnum.photo,
      CustomersColumnsEnum.name,
      CustomersColumnsEnum.email,
      CustomersColumnsEnum.posts,
      CustomersColumnsEnum.date,
    ];
  }

  public ngOnInit(): void {
    this.initializeCustomersSuscription();
    this.store.dispatch(loadCustomers());
  }

  private initializeCustomersSuscription(): void {
    this.storeSuscription = this.store
      .select(this.CUSTOMERS_STORE_KEY)
      .subscribe(({ customers, loaded, loading, error }) => {
        this.isLoading = loading;
        this.isLoaded = loaded;
        if (customers) {
          this.customersStored = customers;
          this.initializeDatasource();
        }
        if (error) {
          this.toast.error(error.message, error.name);
        }
      });
  }

  private initializeDatasource(): void {
    this.dataSource = this.customersStored
      ?.filter((customer) => customer.company.name === NameCompanyEnum.Yoigo)
      .sort(this.sortArray);
  }

  private sortArray(x: Customer, y: Customer): number {
    if (x.name < y.name) {
      return -1;
    }
    if (x.name > y.name) {
      return 1;
    }
    return 0;
  }

  public selection(customer: Customer): void {
    console.log(customer);
    this.dialog.open(DialogComponent, {
      width: this.WIDTH_DIALOG,
      data: customer,
    });
  }

  public ngOnDestroy(): void {
    this.store.dispatch(customersClear());
    this.storeSuscription?.unsubscribe();
  }
}
