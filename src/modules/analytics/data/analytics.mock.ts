import { FinancialAlert } from '../../../shared/types';

export const ANALYTICS_SUMMARY_MOCK = {
  income: 1200000,
  expense: 410000,
};

export const ANALYTICS_ALERTS_MOCK: FinancialAlert[] = [
  {
    id: 'al-1',
    title: 'Transporte cerca del límite',
    message: 'Has consumido el 83% del presupuesto mensual de Transporte.',
    severity: 'warning',
  },
];