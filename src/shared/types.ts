export type TransactionType = 'income' | 'expense';

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  category: string;
  amount: number;
  description: string;
  date: string;
}

export interface Budget {
  id: string;
  category: string;
  limitAmount: number;
  spentAmount: number;
  month: string;
}

export interface FinancialAlert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'danger';
}