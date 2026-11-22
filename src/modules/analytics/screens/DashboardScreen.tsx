import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAnalytics } from '../hooks/useAnalytics';
import { BalanceSummaryCard } from '../components/BalanceSummaryCard';

export function DashboardScreen() {
  const { summary, netBalance, alerts } = useAnalytics();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen del mes</Text>
      <BalanceSummaryCard
        income={summary.income}
        expense={summary.expense}
        netBalance={netBalance}
      />
      {alerts.map((a) => (
        <View key={a.id} style={styles.alertBox}>
          <Text style={styles.alertTitle}>{a.title}</Text>
          <Text style={styles.alertMsg}>{a.message}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  alertBox: { backgroundColor: '#FEF3C7', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#F59E0B' },
  alertTitle: { fontSize: 14, fontWeight: '700', color: '#92400E' },
  alertMsg: { fontSize: 13, color: '#78350F', marginTop: 2 },
});