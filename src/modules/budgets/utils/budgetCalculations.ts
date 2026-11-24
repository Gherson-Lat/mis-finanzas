/** Porcentaje gastado respecto al límite (entero entre 0 y 100). */
export function calcularPorcentaje(spentAmount: number, limitAmount: number): number {
  if (limitAmount <= 0 || spentAmount <= 0) return 0;
  return Math.min(100, Math.round((spentAmount / limitAmount) * 100));
}

/** Color de la barra según el porcentaje consumido. */
export function colorDeProgreso(porcentaje: number): string {
  if (porcentaje >= 100) return '#DC2626'; // rojo: límite alcanzado o superado
  if (porcentaje >= 80) return '#D97706';  // ámbar: cerca del límite
  return '#16A34A';                        // verde: dentro de lo normal
}
