import { NameCompanyEnum } from "../enums/customer";

export interface Customer {
  name:           string;
  username:       string;
  email:          string;
  address:        Address;
  phone:          string;
  website:        string;
  company:        Company;
  posts:          Post[];
  accountHistory: AccountHistory[];
  subject:        string;
}

export interface AccountHistory {
  amount:   string;
  date:     Date;
  business: string;
  name:     string;
  type:     Type;
  account:  string;
}

export enum Type {
  Deposit = "deposit",
  Invoice = "invoice",
  Payment = "payment",
  Withdrawal = "withdrawal",
}

export interface Address {
  streetA: string;
  streetB: string;
  streetC: string;
  streetD: string;
  city:    string;
  state:   string;
  country: string;
  zipcode: string;
  geo:     Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: NameCompanyEnum;
}

export interface Post {
  words:     string;
  sentence:  string;
  sentences: string;
  paragraph: string;
}
