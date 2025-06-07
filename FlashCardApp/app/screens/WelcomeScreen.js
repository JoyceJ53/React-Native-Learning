import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

function WelcomeScreen({navigation}) {
    return (
        
        <View style={styles.container}>
            {/* Welcome text */}
            <Text>Welcome to my flash card app!</Text>
            {/* Logo */}
            <Image 
                source={{uri: "https://clipart-library.com/2023/25-254660_transparent-flashcards-clipart-flashcard-png-png-download.png"}}
                style={{width: 150, height: 150}}/>
            {/* Intro text */}
            <Text>Press the button below to get started</Text>
            {/* Get started button */}
            <Button
                title="Get Started!" 
                color="#841584"
                onPress={() => navigation.navigate('My Flashcards') }
            />
            <StatusBar style="auto" />
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WelcomeScreen;