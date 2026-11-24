import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { TransactionType } from '../../../shared/types';
import { AddResult, NewTransactionInput } from '../hooks/useTransactions';
import { ACCOUNT_OPTIONS, DEFAULT_CATEGORIES } from '../data/accountOptions';
import { parseAmount } from '../utils/format';

interface Props {
  onSubmit: (input: NewTransactionInput) => AddResult;
}

export function TransactionForm({ onSubmit }: Props) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [accountId, setAccountId] = useState(ACCOUNT_OPTIONS[0].id);
  const [error, setError] = useState<string | null>(null);

  const accent = type === 'income' ? '#16A34A' : '#DC2626';

  const changeType = (next: TransactionType) => {
    setType(next);
    setCategory('');
    setError(null);
  };

  const submit = () => {
    const result = onSubmit({
      accountId,
      type,
      category,
      amount: parseAmount(amount),
      description,
    });
    if (result.ok) {
      setAmount('');
      setCategory('');
      setDescription('');
      setError(null);
    } else {
      setError(result.error);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Nuevo movimiento</Text>

      <View style={styles.toggle}>
        {(['expense', 'income'] as const).map((t) => {
          const active = t === type;
          return (
            <TouchableOpacity
              key={t}
              style={[styles.toggleBtn, active && { backgroundColor: accent }]}
              onPress={() => changeType(t)}
              accessibilityRole="button"
            >
              <Text style={[styles.toggleLabel, active && styles.toggleLabelActive]}>
                {t === 'income' ? 'Ingreso' : 'Gasto'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Monto (COP)"
        placeholderTextColor="#94A3B8"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.chips}>
        {DEFAULT_CATEGORIES[type].map((c) => {
          const active = c === category;
          return (
            <TouchableOpacity
              key={c}
              style={[styles.chip, active && { borderColor: accent, backgroundColor: '#F1F5F9' }]}
              onPress={() => setCategory(c)}
              accessibilityRole="button"
            >
              <Text style={[styles.chipLabel, active && { color: accent, fontWeight: '700' }]}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Categoría (o escribe otra)"
        placeholderTextColor="#94A3B8"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción (opcional)"
        placeholderTextColor="#94A3B8"
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.chips}>
        {ACCOUNT_OPTIONS.map((a) => {
          const active = a.id === accountId;
          return (
            <TouchableOpacity
              key={a.id}
              style={[styles.chip, active && { borderColor: '#2563EB', backgroundColor: '#EFF6FF' }]}
              onPress={() => setAccountId(a.id)}
              accessibilityRole="button"
            >
              <Text style={[styles.chipLabel, active && { color: '#2563EB', fontWeight: '700' }]}>
                💳 {a.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={[styles.submit, { backgroundColor: accent }]} onPress={submit}>
        <Text style={styles.submitLabel}>
          Registrar {type === 'income' ? 'ingreso' : 'gasto'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    gap: 10,
  },
  heading: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  toggle: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 10, padding: 3 },
  toggleBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  toggleLabel: { fontSize: 13, fontWeight: '600', color: '#475569' },
  toggleLabelActive: { color: '#FFFFFF' },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipLabel: { fontSize: 12, color: '#475569', fontWeight: '600' },
  error: { color: '#B91C1C', fontSize: 12, fontWeight: '600' },
  submit: { paddingVertical: 11, borderRadius: 10, alignItems: 'center' },
  submitLabel: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});
