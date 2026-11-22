import { useState } from 'react';
import { Transaction } from '../../../shared/types';
import { TRANSACTIONS_MOCK } from '../data/transactions.mock';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS_MOCK);

  // TODO (Dev 2): agregar funciones para crear, filtrar por tipo y eliminar movimiento
  return { transactions, setTransactions };
}