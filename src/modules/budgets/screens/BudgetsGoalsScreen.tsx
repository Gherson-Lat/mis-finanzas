import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useBudgets } from '../hooks/useBudgets';
import { BudgetProgressCard } from '../components/BudgetProgressCard';
import { BudgetSummary } from '../components/BudgetSummary';

export function BudgetsGoalsScreen() {
  const { budgets, resumen } = useBudgets();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Presupuestos y Metas</Text>
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BudgetProgressCard budget={item} />}
        ListHeaderComponent={budgets.length > 0 ? <BudgetSummary resumen={resumen} /> : undefined}
        ListEmptyComponent={<Text style={styles.empty}>Aún no tienes presupuestos.</Text>}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  title: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  list: { gap: 10, paddingBottom: 24 },
  empty: { textAlign: 'center', color: '#64748B', marginTop: 24 },
});
