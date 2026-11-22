import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  income: number;
  expense: number;
  netBalance: number;
}

export function BalanceSummaryCard({ income, expense, netBalance }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Balance neto</Text>
      <Text style={styles.net}>${netBalance}</Text>
      <View style={styles.row}>
        <Text style={styles.income}>Ingresos: ${income}</Text>
        <Text style={styles.expense}>Gastos: ${expense}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  label: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  net: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginVertical: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  income: { fontSize: 13, color: '#15803D', fontWeight: '600' },
  expense: { fontSize: 13, color: '#B91C1C', fontWeight: '600' },
});