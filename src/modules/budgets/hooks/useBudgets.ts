import { useCallback, useMemo, useState } from 'react';
import { Budget } from '../../../shared/types';
import { BUDGETS_MOCK } from '../data/budgets.mock';
import { resumirPresupuestos } from '../utils/budgetCalculations';

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>(BUDGETS_MOCK);

  const resumen = useMemo(() => resumirPresupuestos(budgets), [budgets]);

  /** Suma un gasto a un presupuesto. Ignora montos inválidos. */
  const registrarGasto = useCallback((id: string, monto: number) => {
    if (!Number.isFinite(monto) || monto <= 0) return;
    setBudgets((prev) =>
      prev.map((b) => (b.id === id ? { ...b, spentAmount: b.spentAmount + monto } : b)),
    );
  }, []);

  return { budgets, setBudgets, resumen, registrarGasto };
}
