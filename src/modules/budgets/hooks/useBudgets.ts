import { useState } from 'react';
import { Budget } from '../../../shared/types';
import { BUDGETS_MOCK } from '../data/budgets.mock';

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>(BUDGETS_MOCK);

  // TODO (Dev 3): calcular porcentaje consumido y agregar acciones de presupuesto/meta
  return { budgets, setBudgets };
}