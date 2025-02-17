import { StyleSheet } from 'react-native';



export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 24,
    },
    input: {
      width: '150%', 
      height: 50,
      borderColor: '#ccc', 
      borderWidth: 1, 
      borderRadius: 25, 
      paddingHorizontal: 10, 
      marginBottom: 20,
      backgroundColor: '#f0f0f0',
      textAlign: 'center',
      color: 'black',
    },
    signUpButton: {
      backgroundColor: '#f6360d', 
      borderRadius: 25, 
      paddingVertical: 12,
      paddingHorizontal: 32,
      marginVertical: 20,
      width: '80%', 
      alignItems: 'center', 
      borderColor: '#fff',
      borderWidth: 2,
    },
    error: {
      color: 'red',
      marginBottom: 12,
    },
    buttonText: {
      color: '#fff', // Couleur du texte
      fontSize: 16, // Taille de la police
      fontWeight: 'bold', // Gras
    },
  });