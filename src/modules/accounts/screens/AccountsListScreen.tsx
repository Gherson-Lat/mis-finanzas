
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';

import { useAccounts } from '../hooks/useAccounts';

export default function AccountsListScreen() {
  const {
    accounts,
    addAccount,
    updateAccount,
  } = useAccounts();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState<any>(null);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  const totalBalance = accounts.reduce(
    (total: number, account: any) =>
      total + Number(account.balance || 0),
    0
  );

  const openAdd = () => {
    setEditingAccount(null);
    setName('');
    setBalance('');
    setModalVisible(true);
  };

  const openEdit = (account: any) => {
    setEditingAccount(account);
    setName(account.name);
    setBalance(String(account.balance));
    setModalVisible(true);
  };

  const saveAccount = async () => {
    if (!name.trim() || balance.trim() === '') {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    const data = {
      name: name.trim(),
      balance: Number(balance),
    };

    try {
      if (editingAccount) {
        await updateAccount(editingAccount.id, data);
      } else {
        await addAccount(data);
      }

      setModalVisible(false);
      setName('');
      setBalance('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la cuenta');
    }
  };

  const renderAccount = ({ item }: any) => (
    <View style={styles.accountCard}>
      <View>
        <Text style={styles.accountName}>{item.name}</Text>
        <Text style={styles.accountBalance}>
          ${Number(item.balance).toLocaleString('es-CO')}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => openEdit(item)}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis cuentas</Text>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Saldo total</Text>
        <Text style={styles.totalAmount}>
          ${totalBalance.toLocaleString('es-CO')}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={openAdd}
      >
        <Text style={styles.buttonText}>+ Agregar cuenta</Text>
      </TouchableOpacity>

      <FlatList
        data={accounts}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={renderAccount}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No tienes cuentas registradas
          </Text>
        }
      />

      {modalVisible && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>
            {editingAccount ? 'Editar cuenta' : 'Nueva cuenta'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre de la cuenta"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Saldo"
            keyboardType="numeric"
            value={balance}
            onChangeText={setBalance}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={saveAccount}
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F6FA',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  totalCard: {
    backgroundColor: '#2457C5',
    padding: 22,
    borderRadius: 14,
    marginBottom: 18,
  },
  totalLabel: {
    color: 'white',
    fontSize: 16,
  },
  totalAmount: {
    color: 'white',
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 8,
  },
  accountCard: {
    backgroundColor: 'white',
    padding: 17,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  accountBalance: {
    fontSize: 15,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#2457C5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 18,
  },
  editButton: {
    backgroundColor: '#E5A000',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    marginTop: 25,
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginTop: 15,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  cancelButton: {
    padding: 12,
    alignItems: 'center',
  },
});
