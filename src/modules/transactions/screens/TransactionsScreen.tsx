import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useTransactions } from '../hooks/useTransactions';
import { TransactionItem } from '../components/TransactionItem';
import { TransactionForm } from '../components/TransactionForm';
import { FilterTabs } from '../components/FilterTabs';

export function TransactionsScreen() {
  const { filteredTransactions, filter, setFilter, addTransaction, removeTransaction } =
    useTransactions();

  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>Movimientos</Text>
      <TransactionForm onSubmit={addTransaction} />
      <FilterTabs value={filter} onChange={setFilter} />
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={filteredTransactions}
      keyExtractor={(tx) => tx.id}
      renderItem={({ item }) => <TransactionItem item={item} onDelete={removeTransaction} />}
      ListHeaderComponent={header}
      ListEmptyComponent={<Text style={styles.empty}>No hay movimientos para mostrar.</Text>}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  content: { padding: 16, gap: 10 },
  header: { gap: 12, marginBottom: 4 },
  title: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  empty: { textAlign: 'center', color: '#64748B', paddingVertical: 24, fontSize: 13 },
});
