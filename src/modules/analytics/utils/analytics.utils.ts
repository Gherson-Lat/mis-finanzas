import { Budget, FinancialAlert, Transaction } from '../../../shared/types';
import { AnalyticsSummary, CategoryExpense } from '../types/analytics.types';

const WARNING_THRESHOLD = 80;
const DANGER_THRESHOLD = 100;
const HIGH_EXPENSE_RATIO = 70;
const DEFAULT_TOP_LIMIT = 3;

const copFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export function formatCOP(value: number): string {
  return copFormatter.format(value);
}

export function roundPercent(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}

/** Transacciones cuya fecha (YYYY-MM-DD) pertenece al mes indicado (YYYY-MM). */
export function filterByMonth(transactions: Transaction[], month: string): Transaction[] {
  return transactions.filter((tx) => tx.date.startsWith(month));
}

export function calculateSummary(transactions: Transaction[]): AnalyticsSummary {
  return transactions.reduce<AnalyticsSummary>(
    (acc, tx) => {
      if (tx.type === 'income') acc.income += tx.amount;
      else acc.expense += tx.amount;
      return acc;
    },
    { income: 0, expense: 0 },
  );
}

export function calculateTopCategories(
  transactions: Transaction[],
  limit: number = DEFAULT_TOP_LIMIT,
): CategoryExpense[] {
  const totals = new Map<string, number>();
  let totalExpense = 0;

  for (const tx of transactions) {
    if (tx.type !== 'expense') continue;
    totals.set(tx.category, (totals.get(tx.category) ?? 0) + tx.amount);
    totalExpense += tx.amount;
  }

  return Array.from(totals, ([category, total]) => ({
    category,
    total,
    percentage: roundPercent(total, totalExpense),
  }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

function buildBudgetAlerts(budgets: Budget[]): FinancialAlert[] {
  const alerts: FinancialAlert[] = [];

  for (const budget of budgets) {
    const used = roundPercent(budget.spentAmount, budget.limitAmount);

    if (used >= DANGER_THRESHOLD) {
      alerts.push({
        id: `budget-danger-${budget.id}`,
        title: `${budget.category} superó el presupuesto`,
        message: `Has consumido el ${used}% del presupuesto mensual de ${budget.category}.`,
        severity: 'danger',
      });
    } else if (used >= WARNING_THRESHOLD) {
      alerts.push({
        id: `budget-warning-${budget.id}`,
        title: `${budget.category} cerca del límite`,
        message: `Has consumido el ${used}% del presupuesto mensual de ${budget.category}.`,
        severity: 'warning',
      });
    }
  }

  return alerts;
}

function buildBalanceAlerts(summary: AnalyticsSummary): FinancialAlert[] {
  const alerts: FinancialAlert[] = [];
  const net = summary.income - summary.expense;
  const expenseRatio = roundPercent(summary.expense, summary.income);

  if (net < 0) {
    alerts.push({
      id: 'balance-negative',
      title: 'Balance negativo',
      message: 'Tus gastos del mes superan tus ingresos.',
      severity: 'danger',
    });
  } else if (expenseRatio >= HIGH_EXPENSE_RATIO) {
    alerts.push({
      id: 'expense-ratio-high',
      title: 'Gastos elevados',
      message: `Tus gastos ya son el ${expenseRatio}% de tus ingresos del mes.`,
      severity: 'warning',
    });
  }

  return alerts;
}

const SEVERITY_ORDER: Record<FinancialAlert['severity'], number> = {
  danger: 0,
  warning: 1,
  info: 2,
};

export function buildAlerts(budgets: Budget[], summary: AnalyticsSummary): FinancialAlert[] {
  const alerts = [...buildBalanceAlerts(summary), ...buildBudgetAlerts(budgets)];

  if (alerts.length === 0) {
    alerts.push({
      id: 'all-good',
      title: 'Todo en orden',
      message: 'No hay alertas este mes. ¡Sigue así!',
      severity: 'info',
    });
  }

  return alerts.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
}
