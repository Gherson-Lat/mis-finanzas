import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  colorDeProgreso,
  formatearMonto,
  ResumenPresupuestos,
} from '../utils/budgetCalculations';

interface Props {
  resumen: ResumenPresupuestos;
}

export function BudgetSummary({ resumen }: Props) {
  const color = colorDeProgreso(resumen.porcentaje);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Resumen del mes</Text>
      <Text style={styles.total}>
        {formatearMonto(resumen.totalGastado)}
        <Text style={styles.limit}> de {formatearMonto(resumen.totalLimite)}</Text>
      </Text>

      <View
        style={styles.track}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: resumen.porcentaje }}
      >
        <View style={[styles.fill, { width: `${resumen.porcentaje}%`, backgroundColor: color }]} />
      </View>


      <Text style={[styles.footer, { color }]}>
        {resumen.porcentaje}% usado
        {resumen.excedidos > 0 ? ` · ${resumen.excedidos} excedido(s)` : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  label: { fontSize: 13, color: '#64748B', marginBottom: 4 },
  total: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  limit: { fontSize: 14, fontWeight: '400', color: '#64748B' },
  track: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 999, overflow: 'hidden', marginTop: 10 },
  fill: { height: '100%' },
  footer: { marginTop: 8, fontSize: 12, fontWeight: '600' },
});
