import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UsernameContext } from '../Context/Context'; //importer le contexte du username
import { ImageBackground } from 'react-native-web';

export default function HomeScreen() {
  const [username] = useContext(UsernameContext); // recuperer  le usename du contexte
  console.log("Rendering HomeScreen"); // Journalisation pour vérifier le rendu du composant

  return (
    <ImageBackground
      source = {require('../assets/todoooo.png')}
      style = {styles.background }
      resizeMode="cover" >
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome!</Text>
            <Text style={styles.loggedAs}>You are logged as {username}</Text>
          </View>

      </ImageBackground>

  );
}

// Styles pour le composant
const styles = StyleSheet.create({
  
  background: {
    flex: 1, // Prend tout l'espace disponible
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1b426e'
  },
  loggedAs: {
    fontSize: 18,
    color: '#1b426e'
  },
});