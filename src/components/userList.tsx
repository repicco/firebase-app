import { useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebaseConnection';
import { IUser } from '../types/global';

interface IUserListProps {
  item: IUser;
  clickEditItem: (item: any) => void;
}

export function UserList({ item, clickEditItem }: IUserListProps) {
  const handleDeleteItem = useCallback(async () => {
    const docRef = doc(db, 'users', item.id);

    await deleteDoc(docRef);
  }, [item.id]);

  return (
    <View style={styles.userItem}>
      <Text style={styles.userItemText}>Nome: {item.name}</Text>
      <Text style={styles.userItemText}>Idade: {item.age}</Text>
      <Text style={styles.userItemText}>Cargo: {item.rule}</Text>

      <TouchableOpacity
        style={styles.buttonDelete}
        onPress={() => handleDeleteItem()}
      >
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonEdit}
        onPress={() => clickEditItem(item)}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  userItem: {
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  userItemText: {
    color: '#000',
    fontSize: 16,
  },
  buttonDelete: {
    backgroundColor: '#f04',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  buttonEdit: {
    backgroundColor: '#000',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    paddingInline: 8,
  },
});
