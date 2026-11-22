import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Account } from '../../../shared/types';

interface Props {
  account: Account;
}

export function AccountCard({ account }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{account.name}</Text>
      <Text style={styles.balance}>
        {account.currency} {account.balance}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  name: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  balance: { fontSize: 13, color: '#475569', marginTop: 4 },
});