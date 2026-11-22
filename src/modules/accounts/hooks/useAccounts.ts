import { useState } from 'react';
import { Account } from '../../../shared/types';
import { ACCOUNTS_MOCK } from '../data/accounts.mock';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>(ACCOUNTS_MOCK);

  // TODO (Dev 1): crear/editar cuenta y calcular saldo total
  return { accounts, setAccounts };
}