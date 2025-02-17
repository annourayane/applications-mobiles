import { StyleSheet } from 'react-native';



export const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: 'red', // Couleur de fond du bouton
      borderRadius: 25, // Coins arrondis
      paddingVertical: 12, // Espacement vertical
      paddingHorizontal: 20, // Espacement horizontal
      borderWidth: 2, // Largeur de la bordure
      borderColor: '#fff', // Couleur de la bordure
    },
    buttonText: {
      color: '#fff', // Couleur du texte
      fontSize: 16, // Taille de la police
      fontWeight: 'bold', // Gras
    },
  });
  