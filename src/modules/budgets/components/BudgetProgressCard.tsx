import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Budget } from '../../../shared/types';
import {
  calcularPorcentaje,
  colorDeProgreso,
  estaExcedido,
  formatearMonto,
  montoRestante,
} from '../utils/budgetCalculations';

interface Props {
  budget: Budget;
}

export function BudgetProgressCard({ budget }: Props) {
  const porcentaje = calcularPorcentaje(budget.spentAmount, budget.limitAmount);
  const color = colorDeProgreso(porcentaje);
  const excedido = estaExcedido(budget.spentAmount, budget.limitAmount);

  return (
    <View
      style={styles.card}
      accessible
      accessibilityLabel={`${budget.category}, ${porcentaje} por ciento del presupuesto usado`}
    >
      <View style={styles.topRow}>
        <Text style={styles.category}>{budget.category}</Text>
        <Text style={[styles.percent, { color }]}>{porcentaje}%</Text>
      </View>


      <View
        style={styles.track}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: porcentaje }}
      >
        <View style={[styles.fill, { width: `${porcentaje}%`, backgroundColor: color }]} />
      </View>

      <Text style={styles.values}>
        {formatearMonto(budget.spentAmount)} / {formatearMonto(budget.limitAmount)}
      </Text>

      {excedido ? (
        <Text style={styles.warning}>Presupuesto excedido</Text>
      ) : (
        <Text style={styles.remaining}>
          Quedan {formatearMonto(montoRestante(budget.spentAmount, budget.limitAmount))}
        </Text>
      )}
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
  remaining: { marginTop: 4, fontSize: 12, color: '#16A34A' },

  warning: { marginTop: 4, fontSize: 12, fontWeight: '600', color: '#DC2626' },
});
