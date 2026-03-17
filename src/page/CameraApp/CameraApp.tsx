import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

export function CameraApp() {
  const [photo, setPhoto] = useState<string>('');

  function openAlbum() {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.error('Usuário cancelou');
        return;
      }

      if (response.errorCode || response.errorMessage) {
        const err = response.errorMessage || response.errorCode;
        console.error('Ocorreu um erro', err);
        return;
      }

      console.log(response.assets);
      if (response.assets) {
        setPhoto(response.assets[0]?.uri ? response.assets[0].uri : '');
      }

      console.error('Imagem não encontrada');
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={openAlbum}>
          <Text style={styles.text}>Abrir album</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Abrir camera</Text>
        </TouchableOpacity>
      </View>

      {photo !== '' && <Image source={{ uri: photo }} style={styles.photo} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttons: {
    marginTop: 32,
    flexDirection: 'row',
    gap: 14,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 24,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  photo: {
    width: '90%',
    height: 300,
    objectFit: 'cover',
  },
});
