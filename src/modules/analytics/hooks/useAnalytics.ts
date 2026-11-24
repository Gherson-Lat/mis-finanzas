import { useMemo } from 'react';
import { FinancialAlert } from '../../../shared/types';
import {
  ANALYTICS_BUDGETS_MOCK,
  ANALYTICS_CURRENT_MONTH,
  ANALYTICS_TRANSACTIONS_MOCK,
} from '../data/analytics.mock';
import { AnalyticsSummary, CategoryExpense } from '../types/analytics.types';
import {
  buildAlerts,
  calculateSummary,
  calculateTopCategories,
  filterByMonth,
} from '../utils/analytics.utils';

interface UseAnalyticsResult {
  month: string;
  summary: AnalyticsSummary;
  netBalance: number;
  topCategories: CategoryExpense[];
  alerts: FinancialAlert[];
}

export function useAnalytics(): UseAnalyticsResult {
  return useMemo(() => {
    const monthTransactions = filterByMonth(ANALYTICS_TRANSACTIONS_MOCK, ANALYTICS_CURRENT_MONTH);
    const monthBudgets = ANALYTICS_BUDGETS_MOCK.filter((b) => b.month === ANALYTICS_CURRENT_MONTH);

    const summary = calculateSummary(monthTransactions);

    return {
      month: ANALYTICS_CURRENT_MONTH,
      summary,
      netBalance: summary.income - summary.expense,
      topCategories: calculateTopCategories(monthTransactions),
      alerts: buildAlerts(monthBudgets, summary),
    };
  }, []);
}
