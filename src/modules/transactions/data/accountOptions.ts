/**
 * Cuentas disponibles para asociar un movimiento.
 * Se mantiene local porque no se permite importar del módulo `accounts`.
 * Los ids coinciden con los de los datos mock (acc-1, acc-2).
 */
export const ACCOUNT_OPTIONS: { id: string; label: string }[] = [
  { id: 'acc-1', label: 'Efectivo' },
  { id: 'acc-2', label: 'Billetera Digital' },
];

export const DEFAULT_CATEGORIES: Record<'income' | 'expense', string[]> = {
  income: ['Salario', 'Ventas', 'Otros ingresos'],
  expense: ['Alimentación', 'Transporte', 'Servicios', 'Ocio', 'Otros gastos'],
};
