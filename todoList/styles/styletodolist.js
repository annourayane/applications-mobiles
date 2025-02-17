import { StyleSheet } from 'react-native';



export const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, marginBottom: 16 },
    progressContainer: { marginBottom: 20, alignItems: 'center' },
    progressText: { marginBottom: 8, fontSize: 30
      , color:"green"
     },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
  
    todoItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowRadius: 2,
      flex: 1,
      marginRight: 10,
      maxWidth: '70%',
    },
    todoListCard: {
      padding: 12,
      backgroundColor: '#ADD8E6',
      borderRadius: 8,
      borderColor: '#007BFF',
      elevation: 2, // ombre pour Android
      shadowColor: '#000', // ombre pour iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      flex: 1,
      marginRight: 2,
      marginTop :20,
      
    },
    listTitle: { fontSize: 20, color: '#333' },
    ownerText: { fontSize: 14, color: '#666' },
    icon: { height: 24, width: 24 },
    error: { color: 'red', marginBottom: 12 },
  
    buttonContainer: {
      alignItems: 'center', // Aligner le bouton au centre
      marginBottom: 20,
    },
  
    buttonText: {
      color: 'white', 
      fontSize: 16,
      marginLeft: 10, 
      
    },
    input: {
      height: 50, 
      borderColor: '#white', 
      borderRadius: 10, 
      paddingHorizontal: 10,
      marginBottom: 10,
      width: '80%',
      alignSelf: 'center',
      borderWidth:'50%',
      borderRadius: 8,
      backgroundColor: '#f0f0f0',
      fontSize: 130, 
    },
  
    button: {
      backgroundColor: '#3b5998', // Couleur de fond du bouton
      borderRadius: 20, // Arrondi des coins
      padding: 10,
      alignItems: 'center', // Centrer le contenu
      justifyContent: 'center',
      flexDirection: 'row', // Pour aligner l'icône et le texte
      marginBottom: 20,
      marginLeft:150,
      width : '20%',
    },
    progressBarContainer: {
      height: 8,
      backgroundColor: '#e0e0e0',
      borderRadius: 4,
      marginVertical: 10,
      width: '100%',
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: '#4CAF50',
    },
  });
  