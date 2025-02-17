import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native'; // Assurez-vous d'importer Image

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <View style={styles.itemContainer}>
      {/* Switch place à gauche */}
      <View style={styles.todoContainer}>
        <Switch
          value={todo.done}
          onValueChange={onToggle} // Inverser l'etat `done`
          thumbColor={todo.done ? 'green' : 'gray'}
        />

        <Text style={[styles.todoText, todo.done && styles.todoTextDone]}>
          {todo.content}
        </Text>
      </View>

      {/* Utilisation de votre image de poubelle */}
      <TouchableOpacity onPress={onDelete}>
        <Image
          source={require('../assets/poubelle.png')} // Chemin de votre image
          style={styles.icon} // Style pour l'image
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 15, 
    width:'55%'
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,  // Ajout d'un espace entre le switch et le texte
  },
  todoTextDone: {
    textDecorationLine: 'line-through',
    color: 'black',
  },
  icon: {
    width: 30,   // Largeur de l'image poubelle
    height: 24,  // Hauteur de l'image poubelle
    tintColor: 'red', // Optionnel : applique une couleur si l'image est monochrome
  },
});
