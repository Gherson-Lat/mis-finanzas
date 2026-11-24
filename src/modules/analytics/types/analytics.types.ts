export interface AnalyticsSummary {
  income: number;
  expense: number;
}

export interface CategoryExpense {
  category: string;
  total: number;
  /** Porcentaje (0-100) que representa del gasto total del mes. */
  percentage: number;
}
