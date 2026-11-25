import type { Budget } from '../../../shared/types';

const esNumeroValido = (n: number) => Number.isFinite(n);

/** Porcentaje gastado respecto al límite (entero entre 0 y 100). */
export function calcularPorcentaje(spentAmount: number, limitAmount: number): number {
  if (!esNumeroValido(spentAmount) || !esNumeroValido(limitAmount)) return 0;
  if (limitAmount <= 0 || spentAmount <= 0) return 0;
  return Math.min(100, Math.round((spentAmount / limitAmount) * 100));
}

/** Color de la barra según el porcentaje consumido. */
export function colorDeProgreso(porcentaje: number): string {
  if (porcentaje >= 100) return '#DC2626'; // rojo: límite alcanzado o superado
  if (porcentaje >= 80) return '#D97706';  // ámbar: cerca del límite
  return '#16A34A';                        // verde: dentro de lo normal
}

/** Indica si el gasto superó el límite. */
export function estaExcedido(spentAmount: number, limitAmount: number): boolean {
  if (!esNumeroValido(spentAmount) || !esNumeroValido(limitAmount)) return false;
  return limitAmount > 0 && spentAmount > limitAmount;
}

/** Cuánto queda disponible (nunca negativo). */
export function montoRestante(spentAmount: number, limitAmount: number): number {
  if (!esNumeroValido(spentAmount) || !esNumeroValido(limitAmount)) return 0;
  return Math.max(0, limitAmount - spentAmount);
}

export interface ResumenPresupuestos {

  totalLimite: number;
  totalGastado: number;
  porcentaje: number;
  excedidos: number;
}

/** Totales de una lista de presupuestos. */
export function resumirPresupuestos(budgets: Budget[]): ResumenPresupuestos {
  let totalLimite = 0;
  let totalGastado = 0;
  let excedidos = 0;

  for (const b of budgets) {
    if (esNumeroValido(b.limitAmount) && b.limitAmount > 0) totalLimite += b.limitAmount;
    if (esNumeroValido(b.spentAmount) && b.spentAmount > 0) totalGastado += b.spentAmount;
    if (estaExcedido(b.spentAmount, b.limitAmount)) excedidos += 1;
  }

  return {
    totalLimite,
    totalGastado,
    porcentaje: calcularPorcentaje(totalGastado, totalLimite),
    excedidos,
  };
}

/** Formato de dinero (miles con punto). */
export function formatearMonto(valor: number): string {
  const seguro = esNumeroValido(valor) ? valor : 0;
  return `$${seguro.toLocaleString('es-CO')}`;
}
