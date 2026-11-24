import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Budget } from '../../../shared/types';
import { calcularPorcentaje, colorDeProgreso } from '../utils/budgetCalculations';

interface Props {
  budget: Budget;
}

const formatear = (valor: number) => `$${valor.toLocaleString('es-CO')}`;

export function BudgetProgressCard({ budget }: Props) {
  const porcentaje = calcularPorcentaje(budget.spentAmount, budget.limitAmount);
  const color = colorDeProgreso(porcentaje);
  const excedido = budget.limitAmount > 0 && budget.spentAmount > budget.limitAmount;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.category}>{budget.category}</Text>
        <Text style={[styles.percent, { color }]}>{porcentaje}%</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${porcentaje}%`, backgroundColor: color }]} />
      </View>

      <Text style={styles.values}>
        {formatear(budget.spentAmount)} / {formatear(budget.limitAmount)}
      </Text>
      {excedido && <Text style={styles.warning}>Presupuesto excedido</Text>}

    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  category: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  percent: { fontSize: 15, fontWeight: '700' },
  track: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 999, overflow: 'hidden' },
  fill: { height: '100%' },
  values: { marginTop: 8, fontSize: 13, color: '#475569' },
  warning: { marginTop: 4, fontSize: 12, fontWeight: '600', color: '#DC2626' },
});
