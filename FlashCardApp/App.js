import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import MyFlashcardsScreen from './app/screens/MyFlashcardsScreen';
import CreateFlashcardScreen from './app/screens/CreateFlashcardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [flashcards, setFlashcards] = useState([
    { id: '1', front: 'front', back: 'back' },
    { id: '2', front: 'front', back: 'back' },
  ]);

  const addFlashcard = (newCard) => {
    setFlashcards((currentCards) => [...currentCards, { id: Date.now().toString(), ...newCard }]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="My Flashcards">
          {(props) => <MyFlashcardsScreen {...props} flashcards={flashcards} />}
        </Stack.Screen>
        <Stack.Screen name="Create Flashcard">
          {(props) => <CreateFlashcardScreen {...props} addFlashcard={addFlashcard} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
