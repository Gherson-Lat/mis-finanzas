import { useCallback, useMemo, useRef, useState } from 'react';
import { Transaction, TransactionType } from '../../../shared/types';
import { TRANSACTIONS_MOCK } from '../data/transactions.mock';
import { todayISO } from '../utils/format';

export type TransactionFilter = 'all' | TransactionType;

export interface NewTransactionInput {
  accountId: string;
  type: TransactionType;
  category: string;
  amount: number;
  description?: string;
  date?: string;
}

export type AddResult = { ok: true } | { ok: false; error: string };

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS_MOCK);
  const [filter, setFilter] = useState<TransactionFilter>('all');
  const counter = useRef(0);

  /** Movimientos filtrados por tipo, del más reciente al más antiguo. */
  const filteredTransactions = useMemo(() => {
    const list = filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);
    return [...list].sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, filter]);

  const addTransaction = useCallback((input: NewTransactionInput): AddResult => {
    const category = input.category.trim();
    if (!Number.isFinite(input.amount) || input.amount <= 0) {
      return { ok: false, error: 'Ingresa un monto mayor a 0.' };
    }
    if (!category) {
      return { ok: false, error: 'Selecciona o escribe una categoría.' };
    }
    if (!input.accountId) {
      return { ok: false, error: 'Selecciona una cuenta.' };
    }

    counter.current += 1;
    const tx: Transaction = {
      id: `tx-${Date.now()}-${counter.current}`,
      accountId: input.accountId,
      type: input.type,
      category,
      amount: input.amount,
      description: (input.description ?? '').trim(),
      date: input.date ?? todayISO(),
    };
    setTransactions((prev) => [tx, ...prev]);
    return { ok: true };
  }, []);

  const removeTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    transactions,
    filteredTransactions,
    filter,
    setFilter,
    addTransaction,
    removeTransaction,
    setTransactions,
  };
}
