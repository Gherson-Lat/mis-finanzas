import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Budget } from '../../../shared/types';

interface Props {
  budget: Budget;
}

export function BudgetProgressCard({ budget }: Props) {
  const ratio = budget.limitAmount > 0 ? Math.min(budget.spentAmount / budget.limitAmount, 1) : 0;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.category}>{budget.category}</Text>
        <Text style={styles.values}>
          ${budget.spentAmount} / ${budget.limitAmount}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  category: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  values: { fontSize: 13, color: '#475569' },
  track: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 999, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#D97706' },
});