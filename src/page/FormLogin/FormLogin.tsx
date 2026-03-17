import { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { auth } from '../../services/firebaseConnection';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormUser } from './components/FormUser/FormUser';

export function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState<{
    email: string | null;
    uid: string | null;
  }>({
    email: null,
    uid: null,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      console.log('onAuthStateChanged:', user?.email ?? null);

      if (user) {
        setAuthUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setAuthUser({
          email: null,
          uid: null,
        });
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  const handleCreateUser = useCallback(async () => {
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  }, [email, password]);

  const captureKeys = useCallback(async () => {
    const userData = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logado:', userData.user.email);

    const keys = await AsyncStorage.getAllKeys();
    console.log('ASYNC STORAGE KEYS:', keys);

    const firebaseKeys = keys.filter(key =>
      key.toLowerCase().includes('firebase'),
    );
    console.log('FIREBASE KEYS:', firebaseKeys);

    for (const key of firebaseKeys) {
      const value = await AsyncStorage.getItem(key);
      console.log('KEY VALUE:', key, value);
    }
  }, [email, password]);

  const handleLoginUser = useCallback(async () => {
    setLoading(true);
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      console.info('User Logado: ', userData.user.email);

      setAuthUser({
        email: userData.user.email,
        uid: userData.user.uid,
      });

      captureKeys();
    } catch (error: any) {
      console.error(error?.code);
    } finally {
      setLoading(false);
    }
  }, [email, password, captureKeys]);

  const handleLogout = useCallback(async () => {
    await signOut(auth);
    setAuthUser({ email: '', uid: '' });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando autenticação...</Text>
      </View>
    );
  }

  if (authUser.uid) {
    return (
      <View style={styles.container}>
        <FormUser />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Email logado: {authUser?.email}</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={ev => setEmail(ev)}
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry={true}
        value={password}
        onChangeText={ev => setPassword(ev)}
      />

      <TouchableOpacity style={styles.button} onPress={handleLoginUser}>
        <Text style={styles.buttonText}>Acessar conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Criar conta</Text>
      </TouchableOpacity>

      {authUser.email && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#f00' }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Sair da conta</Text>
        </TouchableOpacity>
      )}
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
    fontSize: 18,
    marginLeft: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#000',
    padding: 8,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
