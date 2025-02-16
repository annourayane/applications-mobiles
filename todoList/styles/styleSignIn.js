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
    resizeMode: 'cover', // Pour que l'image couvre tout l'écran
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    color : 'white',
  },
  input: {
    width: '100%', // Largeur à 100%
    height: 50, // Hauteur des champs de saisie
    borderColor: '#ccc', // Couleur de la bordure
    borderWidth: 1, // Épaisseur de la bordure
    borderRadius: 25, // Coins arrondis
    paddingHorizontal: 10, // Ajoute du padding horizontal
    marginBottom: 20, 
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    color: 'black',
  },
  signInButton: {
    backgroundColor: '#f6360d', // Couleur de fond rouge
    borderRadius: 25, // Coins arrondis
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginVertical: 20,
    width: '80%', // Ajuste la largeur du bouton
    alignItems: 'center', // Centre le texte
    borderColor: '#fff',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white', // Couleur du texte
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  signUpText: {
    marginTop: 20,
    color: 'white',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    width: '150%', // Limite la largeur des champs à 80% de l'écran
  },
});