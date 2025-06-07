import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';

export default function FlashCardScreen({ navigation, flashcards: flashcardsProp }) {
  const [flashcards, setFlashcards] = useState(flashcardsProp || []);

  useEffect(() => {
    setFlashcards(flashcardsProp || []);
  }, [flashcardsProp]);

  const deleteFlashcard = (id) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
  };

  const FlipCard = ({ front, back }) => {
    const flipAnim = React.useRef(new Animated.Value(0)).current;
    const [flipped, setFlipped] = React.useState(false);

    const frontInterpolate = flipAnim.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    const backInterpolate = flipAnim.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });

    const flipCard = () => {
      if (flipped) {
        Animated.spring(flipAnim, {
          toValue: 0,
          friction: 8,
          tension: 10,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(flipAnim, {
          toValue: 180,
          friction: 8,
          tension: 10,
          useNativeDriver: true,
        }).start();
      }
      setFlipped(!flipped);
    };

    return (
      <TouchableOpacity onPress={flipCard} style={{ flex: 1 }}>
        <View style={styles.cardContainer}>
          <Animated.View
            style={[
              styles.card,
              { transform: [{ rotateY: frontInterpolate }] },
              styles.cardFront,
            ]}
          >
            <Text style={styles.cardText}>{front}</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              { transform: [{ rotateY: backInterpolate }] },
              { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
            ]}
          >
            <Text style={styles.cardText}>{back}</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardRow}>
      <FlipCard front={item.front} back={item.back} />
      <TouchableOpacity
        onPress={() => deleteFlashcard(item.id)}
        style={styles.deleteButton}
      >
        <Text style={{ color: '#d11a2a', fontWeight: 'bold' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {flashcards.length === 0 ? (
        <Text style={styles.noCardsText}>You do not have any flashcards</Text>
      ) : (
        <FlatList
          data={flashcards}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Create Flashcard"
          onPress={() => navigation.navigate('Create Flashcard')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  noCardsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  buttonContainer: {
    marginTop: 20,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardContainer: {
    flex: 1,
    height: 120,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    backgroundColor: '#841584',
  },
  cardBack: {
    backgroundColor: '#4CAF50',
  },
  cardText: {
    color: 'white',
    fontSize: 20,
  },
  deleteButton: {
    width: 80,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});