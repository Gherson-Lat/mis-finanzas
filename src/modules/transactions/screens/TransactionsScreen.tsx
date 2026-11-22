import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTransactions } from '../hooks/useTransactions';
import { TransactionItem } from '../components/TransactionItem';

export function TransactionsScreen() {
  const { transactions } = useTransactions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimientos</Text>
      {transactions.map((tx) => (
        <TransactionItem key={tx.id} item={tx} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  title: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
});