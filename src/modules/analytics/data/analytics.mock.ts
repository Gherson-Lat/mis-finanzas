import { Budget, Transaction } from '../../../shared/types';

/** Mes que muestra el dashboard (formato YYYY-MM). */
export const ANALYTICS_CURRENT_MONTH = '2026-11';

/**
 * Datos de ejemplo propios del módulo Analytics.
 * No se importan los mocks de otros módulos (regla de arquitectura);
 * cuando exista una fuente compartida, solo se cambia este archivo.
 */
export const ANALYTICS_TRANSACTIONS_MOCK: Transaction[] = [
  { id: 'an-tx-1', accountId: 'acc-1', type: 'income', category: 'Salario', amount: 1200000, description: 'Pago quincenal', date: '2026-11-15' },
  { id: 'an-tx-2', accountId: 'acc-2', type: 'expense', category: 'Alimentación', amount: 260000, description: 'Mercado y restaurantes', date: '2026-11-16' },
  { id: 'an-tx-3', accountId: 'acc-2', type: 'expense', category: 'Transporte', amount: 150000, description: 'Gasolina y pasajes', date: '2026-11-18' },
  { id: 'an-tx-4', accountId: 'acc-1', type: 'expense', category: 'Entretenimiento', amount: 90000, description: 'Cine y streaming', date: '2026-11-20' },
  { id: 'an-tx-5', accountId: 'acc-1', type: 'expense', category: 'Servicios', amount: 110000, description: 'Internet y energía', date: '2026-11-21' },
  { id: 'an-tx-6', accountId: 'acc-1', type: 'expense', category: 'Alimentación', amount: 45000, description: 'Mercado del día', date: '2026-10-28' },
];

export const ANALYTICS_BUDGETS_MOCK: Budget[] = [
  { id: 'an-bdg-1', category: 'Alimentación', limitAmount: 400000, spentAmount: 260000, month: '2026-11' },
  { id: 'an-bdg-2', category: 'Transporte', limitAmount: 180000, spentAmount: 150000, month: '2026-11' },
  { id: 'an-bdg-3', category: 'Entretenimiento', limitAmount: 80000, spentAmount: 90000, month: '2026-11' },
];
