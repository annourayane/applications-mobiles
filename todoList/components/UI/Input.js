import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

//ajout d'une nouvelle todoliste le champs de saisie 
export default function Input({ placeholder, buttonText, onSubmit, value, onChangeText }) {
  const handlePress = () => {
    if (value.trim()) {
      onSubmit(value);
    } else {
      Alert.alert('Erreur', 'Veuillez entrer une valeur valide.'); // Message d'erreur
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={placeholder} // Ajout d'accessibilite
      />
      <Button 
        title={buttonText} 
        onPress={handlePress} 
        disabled={!value.trim()} // Desactive le bouton si l'input est vide
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
    height: 40,
  },
});
