import { useState } from 'react';
import { FinancialAlert } from '../../../shared/types';
import { ANALYTICS_ALERTS_MOCK, ANALYTICS_SUMMARY_MOCK } from '../data/analytics.mock';

export function useAnalytics() {
  const [summary] = useState(ANALYTICS_SUMMARY_MOCK);
  const [alerts] = useState<FinancialAlert[]>(ANALYTICS_ALERTS_MOCK);
  const netBalance = summary.income - summary.expense;

  // TODO (Dev 4): calcular top categorías y reglas de alertas
  return { summary, netBalance, alerts };
}