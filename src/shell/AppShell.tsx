import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

import { AnalyticsModule } from '../modules/analytics';
import { TransactionsModule } from '../modules/transactions';
import { AccountsModule } from '../modules/accounts';
import { BudgetsModule } from '../modules/budgets';

type TabKey = 'analytics' | 'transactions' | 'accounts' | 'budgets';

interface TabItem {
  key: TabKey;
  label: string;
  icon: string;
  accent: string;
}

const TABS: TabItem[] = [
  { key: 'analytics', label: 'Resumen', icon: '📊', accent: '#7C3AED' },
  { key: 'transactions', label: 'Movimientos', icon: '↕️', accent: '#16A34A' },
  { key: 'accounts', label: 'Cuentas', icon: '💳', accent: '#2563EB' },
  { key: 'budgets', label: 'Metas', icon: '🎯', accent: '#D97706' },
];

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabKey>('analytics');

  const renderScreen = () => {
    switch (activeTab) {
      case 'accounts':
        return <AccountsModule />;
      case 'transactions':
        return <TransactionsModule />;
      case 'budgets':
        return <BudgetsModule />;
      case 'analytics':
      default:
        return <AnalyticsModule />;
    }
  };

  return (
    <View style={styles.backdrop}>
      <SafeAreaView style={styles.frame}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mis Finanzas</Text>
          <Text style={styles.headerBadge}>COP</Text>
        </View>

        <View style={styles.body}>{renderScreen()}</View>

        <View style={styles.tabBar}>
          {TABS.map((tab) => {
            const active = tab.key === activeTab;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, active && { borderTopColor: tab.accent, borderTopWidth: 2 }]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text style={[styles.tabLabel, active && { color: tab.accent, fontWeight: '700' }]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#E2E8F0' : '#0F172A',
    alignItems: 'center',
  },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 460 : undefined,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  headerBadge: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  body: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', gap: 2 },
  tabIcon: { fontSize: 16 },
  tabLabel: { fontSize: 11, fontWeight: '600', color: '#64748B' },
});