import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Transaction } from '../../../shared/types';
import { formatCOP } from '../utils/format';

interface Props {
  item: Transaction;
  onDelete?: (id: string) => void;
}

export function TransactionItem({ item, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);
  const isIncome = item.type === 'income';

  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.meta} numberOfLines={1}>
          {item.description ? `${item.description} · ${item.date}` : item.date}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.amount, { color: isIncome ? '#15803D' : '#B91C1C' }]}>
          {isIncome ? '+' : '-'}${formatCOP(item.amount)}
        </Text>

        {onDelete &&
          (confirming ? (
            <View style={styles.confirmRow}>
              <TouchableOpacity onPress={() => onDelete(item.id)} accessibilityRole="button">
                <Text style={styles.confirmYes}>Sí, eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setConfirming(false)} accessibilityRole="button">
                <Text style={styles.confirmNo}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setConfirming(true)} accessibilityRole="button">
              <Text style={styles.delete}>Eliminar</Text>
            </TouchableOpacity>
          ))}
      </View>
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
    gap: 10,
  },
  info: { flex: 1 },
  right: { alignItems: 'flex-end', gap: 4 },
  category: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  meta: { fontSize: 12, color: '#64748B', marginTop: 2 },
  amount: { fontSize: 15, fontWeight: '700' },
  delete: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  confirmRow: { flexDirection: 'row', gap: 12 },
  confirmYes: { fontSize: 12, color: '#B91C1C', fontWeight: '700' },
  confirmNo: { fontSize: 12, color: '#64748B', fontWeight: '600' },
});
