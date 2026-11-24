import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TransactionFilter } from '../hooks/useTransactions';

const OPTIONS: { key: TransactionFilter; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'income', label: 'Ingresos' },
  { key: 'expense', label: 'Gastos' },
];

interface Props {
  value: TransactionFilter;
  onChange: (value: TransactionFilter) => void;
}

export function FilterTabs({ value, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      {OPTIONS.map((opt) => {
        const active = opt.key === value;
        return (
          <TouchableOpacity
            key={opt.key}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onChange(opt.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{opt.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: { backgroundColor: '#16A34A', borderColor: '#16A34A' },
  label: { fontSize: 13, fontWeight: '600', color: '#475569' },
  labelActive: { color: '#FFFFFF' },
});
