/** Formatea un entero como moneda COP: 1200000 -> "1.200.000". */
export function formatCOP(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Convierte lo que escribe el usuario ("45.000", "$45000") a número entero. */
export function parseAmount(text: string): number {
  const digits = text.replace(/[^\d]/g, '');
  return digits ? Number(digits) : 0;
}

/** Fecha local de hoy en formato YYYY-MM-DD. */
export function todayISO(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}
