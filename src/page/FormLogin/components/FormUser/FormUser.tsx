import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { auth, db } from '../../../../services/firebaseConnection';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserList } from '../../../../components/userList';
import { IUser } from '../../../../types/global';
import { signOut } from 'firebase/auth';

export function FormUser() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [rule, setRule] = useState('');

  const [showForm, setShowForm] = useState(true);
  const [isEditing, setIsEditing] = useState('');

  const [userList, setUserList] = useState<IUser[]>([]);

  const getData = useCallback(async () => {
    /*
    Assincrono para 1 doc
    const docRef = doc(db, 'users', '1');

    try {
      const docSnap = await getDoc(docRef);

      setName(docSnap?.data()?.nome);
    } catch (error) {
      console.error(error);
    } 
    */

    // Real time para 1 doc
    /*  try {
      onSnapshot(doc(db, 'users', '3'), snap => {
        setName(snap?.data()?.nome);
        setAge(snap?.data()?.idade.toString());
        setRule(snap?.data()?.cargo);

        console.log(snap?.data());
      });
    } catch (error) {
      console.error(error);
    } */

    /* 
      Assincrono para coleção
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const arrList = [];

      querySnapshot.forEach(doc => {
        arrList.push({
          id: doc.id,
          name: doc.data().nome,
          age: doc.data().idade,
          rule: doc.data().cargo,
        });
      });

      setUserList(arrList);
    } catch (error) {
      console.log(error);
    } */

    // Real time para coleção
    onSnapshot(collection(db, 'users'), snap => {
      const arrList: IUser[] = [];

      snap.forEach(doc => {
        arrList.push({
          id: doc.id,
          name: doc.data().nome,
          age: doc.data().idade,
          rule: doc.data().cargo,
        });
      });

      setUserList(arrList);
    });
  }, []);

  const handleRegister = useCallback(async () => {
    /* 
    Item especifico

    try {
      await setDoc(doc(db, 'users', '3'), {
        nome: 'João',
        idade: 20,
        cargo: 'Desenvolvedor'
      });
      console.log('Cadastrado com sucesso!');
    } catch (error) {
      console.log(error);
    } */

    // Item dentro da coleção

    try {
      await addDoc(collection(db, 'users'), {
        nome: name,
        idade: age,
        cargo: rule,
      });
      console.log('Cadastrado com sucesso!');
      setName('');
      setAge('');
      setRule('');
    } catch (error) {
      console.log(error);
    }
  }, [name, age, rule]);

  const handleShowForm = useCallback(() => {
    setShowForm(!showForm);
  }, [showForm]);

  const clickEditItem = useCallback((item: IUser) => {
    setName(item.name);
    setAge(item.age.toString());
    setRule(item.rule);

    setIsEditing(item.id);
  }, []);

  const handleEditUser = useCallback(async () => {
    const docRef = doc(db, 'users', isEditing);

    await updateDoc(docRef, {
      nome: name,
      idade: age,
      cargo: rule,
    });

    setName('');
    setAge('');
    setRule('');
    setIsEditing('');
  }, [name, age, rule, isEditing]);

  const handleLogout = useCallback(async () => {
    await signOut(auth);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <View style={styles.container}>
      {showForm && (
        <>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome..."
            value={name}
            onChangeText={e => setName(e)}
          />

          <Text style={styles.label}>Idade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua idade..."
            value={age}
            onChangeText={e => setAge(e)}
          />

          <Text style={styles.label}>Cargo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu cargo..."
            value={rule}
            onChangeText={e => setRule(e)}
          />

          {isEditing !== '' ? (
            <TouchableOpacity
              onPress={() => handleEditUser()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handleRegister()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      <TouchableOpacity onPress={() => handleShowForm()} style={styles.button}>
        <Text style={styles.buttonText}>
          {showForm ? 'Esconder' : 'Mostrar'} formulario
        </Text>
      </TouchableOpacity>

      <Text style={styles.userTitle}>Usuários:</Text>
      <FlatList
        data={userList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <UserList item={item} clickEditItem={clickEditItem} />
        )}
      />

      <TouchableOpacity style={styles.buttonLogout}>
        <Text style={styles.textLogout} onPress={handleLogout}>
          Sair da conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 8,
  },
  label: {
    color: '#000',
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  input: {
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 4,
    marginTop: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    padding: 8,
    textAlign: 'center',
  },
  userTitle: {
    color: '#000',
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16,
  },
  buttonLogout: {
    backgroundColor: '#f00',
    alignSelf: 'flex-start',
    color: '#000',
    fontSize: 16,
    margin: 14,
    padding: 8,
    borderRadius: 4,
  },
  textLogout: {
    color: '#fff',
  },
});
