import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FinancialAlert } from '../../../shared/types';

interface Props {
  alert: FinancialAlert;
}

const PALETTE: Record<FinancialAlert['severity'], { bg: string; border: string; title: string; text: string }> = {
  info: { bg: '#DBEAFE', border: '#3B82F6', title: '#1E3A8A', text: '#1E40AF' },
  warning: { bg: '#FEF3C7', border: '#F59E0B', title: '#92400E', text: '#78350F' },
  danger: { bg: '#FEE2E2', border: '#EF4444', title: '#991B1B', text: '#7F1D1D' },
};

export function AlertCard({ alert }: Props) {
  const colors = PALETTE[alert.severity];

  return (
    <View style={[styles.box, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.title }]}>{alert.title}</Text>
      <Text style={[styles.message, { color: colors.text }]}>{alert.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 12, borderRadius: 10, borderWidth: 1 },
  title: { fontSize: 14, fontWeight: '700' },
  message: { fontSize: 13, marginTop: 2 },
});
