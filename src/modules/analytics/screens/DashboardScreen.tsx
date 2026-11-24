import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useAnalytics } from '../hooks/useAnalytics';
import { BalanceSummaryCard } from '../components/BalanceSummaryCard';
import { TopCategoriesCard } from '../components/TopCategoriesCard';
import { AlertCard } from '../components/AlertCard';

export function DashboardScreen() {
  const { summary, netBalance, topCategories, alerts } = useAnalytics();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resumen del mes</Text>
      <BalanceSummaryCard income={summary.income} expense={summary.expense} netBalance={netBalance} />
      <TopCategoriesCard categories={topCategories} />
      <Text style={styles.subtitle}>Alertas</Text>
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  subtitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginTop: 4 },
});
