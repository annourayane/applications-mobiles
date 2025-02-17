import React, { useState, useEffect } from 'react';
import Navigation from './Navigation/Navigation'; 
import { TokenProvider, UsernameProvider } from './Context/Context'; 
import { StyleSheet, ActivityIndicator, View } from 'react-native';


//composant principale de l'app

export default function App() {
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement initial

  useEffect(() => {
    // Simulez un chargement initial (ex: vérification du token)
    const loadData = async () => {
      try {
        // Ajoutez ici votre logique de chargement (par exemple, vérifier un token)
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulation d'une attente
      } catch (error) {
        console.error("Erreur lors du chargement des données : ", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <TokenProvider>
      <UsernameProvider>
        <Navigation />
      </UsernameProvider>
    </TokenProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
