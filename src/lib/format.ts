const pesos = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

/** 75000 → "$75.000" */
export const formatPrice = (value: number) => `$${pesos.format(value)}`;

/** 3 → "03" */
export const padIndex = (n: number) => String(n).padStart(2, '0');
