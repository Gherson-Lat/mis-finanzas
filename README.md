# Mis Finanzas

Aplicación móvil desarrollada con **React Native**, **Expo** y **TypeScript** bajo una arquitectura modular por dominio (*Vertical Slice*).

## Estructura del Proyecto

- `src/shell/AppShell.tsx`: Navegación principal y marco general de la aplicación.
- `src/shared/types.ts`: Contratos y tipos compartidos (`Account`, `Transaction`, `Budget`, `FinancialAlert`).
- `src/modules/accounts`: Cuentas y saldos (**Dev 1** — rama `feat/mod-accounts`).
- `src/modules/transactions`: Ingresos y gastos (**Dev 2** — rama `feat/mod-transactions`).
- `src/modules/budgets`: Presupuestos y metas (**Dev 3** — rama `feat/mod-budgets`).
- `src/modules/analytics`: Resumen, balance y alertas (**Dev 4** — rama `feat/mod-analytics`).

## Reglas de Arquitectura

1. Cada desarrollador trabaja **únicamente** dentro de su carpeta `src/modules/<su-modulo>/` y en su rama `feat/mod-<su-modulo>`.
2. **Prohibido** importar archivos internos de otro módulo (`src/modules/otro-modulo/...`). Solo se permite importar desde `src/shared/`.
3. **No** agregar librerías nuevas, pantallas extra ni funcionalidades fuera del alcance del ticket sin aprobación previa del Arquitecto.
4. Todo cambio se integra a `dev` mediante **Pull Request** con revisión.

## Cómo Ejecutar

```bash
npx expo start