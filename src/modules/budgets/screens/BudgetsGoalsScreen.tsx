import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useBudgets } from '../hooks/useBudgets';
import { BudgetProgressCard } from '../components/BudgetProgressCard';

export function BudgetsGoalsScreen() {
  const { budgets } = useBudgets();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Presupuestos y Metas</Text>
      {budgets.map((b) => (
        <BudgetProgressCard key={b.id} budget={b} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  title: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
});