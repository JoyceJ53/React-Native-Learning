import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';

function CreateFlashcardScreen({ navigation, addFlashcard }) {
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');

  const saveFlashcard = () => {
    if (frontText.trim() === '' || backText.trim() === '') {
      Alert.alert('Error', 'Please fill in both the front and back of the flashcard.');
      return;
    }
    addFlashcard({ front: frontText, back: backText });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <Text style={styles.title}>Create a New Flashcard</Text>
      <Text style={styles.label}>Front</Text>
      <TextInput style={styles.input} placeholder="Enter front text" value={frontText} onChangeText={setFrontText} />
      <Text style={styles.label}>Back</Text>
      <TextInput style={styles.input} placeholder="Enter back text" value={backText} onChangeText={setBackText} />
      <View style={styles.buttonContainer}>
        <Button title="Save Flashcard" color="#841584" onPress={saveFlashcard} />
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 24, fontWeight: 'bold', textAlign: 'center' },
  label: { fontSize: 18, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#888', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 20, fontSize: 16 },
  buttonContainer: { marginTop: 10 },
});

export default CreateFlashcardScreen;
