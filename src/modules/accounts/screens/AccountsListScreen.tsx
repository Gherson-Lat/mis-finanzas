import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAccounts } from '../hooks/useAccounts';
import { AccountCard } from '../components/AccountCard';

export function AccountsListScreen() {
  const { accounts } = useAccounts();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuentas</Text>
      {accounts.map((acc) => (
        <AccountCard key={acc.id} account={acc} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  title: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
});