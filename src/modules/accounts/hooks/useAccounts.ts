import { useState } from 'react';
import { Account } from '../../../shared/types';
import { ACCOUNTS_MOCK } from '../data/accounts.mock';

// Datos necesarios para crear una cuenta
type NewAccount = Omit<Account, 'id'>;

// Datos que se pueden modificar
type AccountUpdates = Partial<Omit<Account, 'id'>>;

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>(ACCOUNTS_MOCK);

  // Calcular el saldo total
  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  // Registrar una cuenta nueva
  const addAccount = (accountData: NewAccount) => {
    const newAccount: Account = {
      id: `acc-${Date.now()}`,
      ...accountData,
    };

    setAccounts((currentAccounts) => [
      ...currentAccounts,
      newAccount,
    ]);

    return newAccount;
  };

  // Editar una cuenta existente
  const updateAccount = (
    id: string,
    changes: AccountUpdates
  ) => {
    setAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.id === id
          ? { ...account, ...changes, id: account.id }
          : account
      )
    );
  };

  return {
    accounts,
    totalBalance,
    addAccount,
    updateAccount,
    setAccounts,
  };
}
