import { Transaction } from '../../../shared/types';

export const TRANSACTIONS_MOCK: Transaction[] = [
  {
    id: 'tx-1',
    accountId: 'acc-1',
    type: 'income',
    category: 'Salario',
    amount: 1200000,
    description: 'Pago quincenal',
    date: '2026-11-15',
  },
  {
    id: 'tx-2',
    accountId: 'acc-2',
    type: 'expense',
    category: 'Alimentación',
    amount: 45000,
    description: 'Mercado del día',
    date: '2026-11-16',
  },
];