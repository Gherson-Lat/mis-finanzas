import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../../../shared/types';

interface Props {
  item: Transaction;
}

export function TransactionItem({ item }: Props) {
  const isIncome = item.type === 'income';

  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.meta}>{item.description || item.date}</Text>
      </View>
      <Text style={[styles.amount, { color: isIncome ? '#15803D' : '#B91C1C' }]}>
        {isIncome ? '+' : '-'}${item.amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  category: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  meta: { fontSize: 12, color: '#64748B', marginTop: 2 },
  amount: { fontSize: 15, fontWeight: '700' },
});