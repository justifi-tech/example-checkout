export class Card {
  name: string = '';
  number: string = '';
  verification: string = '';
  month: string = '';
  year: string = '';
  brand: string = '';
  company: string = '';
  address_line1: string = '';
  address_line2: string = '';
  address_city: string = '';
  address_state: string = '';
  address_postal_code: string = '';
  address_country: string = '';
  address_phone: string = '';
}

export class BankAccount {
  name: string = ''
  routing_number: string = ''
  account_number: string = ''
  account_type: string = ''
  account_holder_type: string = ''
}

export interface IPaymentMethod {
  card?: Card,
  bank_account?: BankAccount,
  token?: string
}

export default class Payment {
  amount: number;
  currency: string = 'usd';
  capture_strategy: string = 'automatic';
  description: string;
  payment_method: IPaymentMethod;

  constructor(params: {
    amount: number,
    description: string,
    payment_method: IPaymentMethod
  }) {
    this.amount = params.amount;
    this.description = params.description;
    this.payment_method = params.payment_method;
  }
};
