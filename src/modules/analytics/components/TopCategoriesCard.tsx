import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CategoryExpense } from '../types/analytics.types';
import { formatCOP } from '../utils/analytics.utils';

interface Props {
  categories: CategoryExpense[];
}

export function TopCategoriesCard({ categories }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Top categorías de gasto</Text>
      {categories.length === 0 ? (
        <Text style={styles.empty}>Aún no hay gastos este mes.</Text>
      ) : (
        categories.map((item) => (
          <View key={item.category} style={styles.item}>
            <View style={styles.itemTop}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.amount}>
                {formatCOP(item.total)} · {item.percentage}%
              </Text>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${item.percentage}%` }]} />
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', gap: 10 },
  title: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  empty: { fontSize: 13, color: '#64748B' },
  item: { gap: 6 },
  itemTop: { flexDirection: 'row', justifyContent: 'space-between' },
  category: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  amount: { fontSize: 13, color: '#475569' },
  track: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 999, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#7C3AED' },
});
