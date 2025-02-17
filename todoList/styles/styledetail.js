import { StyleSheet } from 'react-native';



export const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 16,
      borderRadius: 10, 
    },
    title: { 
      fontSize: 24, 
      marginBottom: 16, 
      fontWeight: '600',
      color: '#333',
    },
    input: { 
      borderColor: '#aaa',
      borderWidth: 1, 
      marginBottom: 10, 
      padding: 10, 
      borderRadius: 8, 
      fontSize: 16,
      backgroundColor: '#f9f9f9',
      color: '#333',
      width: '100%',
    },
    background: {
      flex: 1,
      justifyContent: 'center',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 8,
    },
    button: {
      flex: 1,
      backgroundColor: '#3b5998', // Bleu professionnel
      padding: 12,
      borderRadius: 8,
      marginHorizontal: 4,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 2,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    counter: {
      fontSize: 16,
      color: '#3b3b3b',
      marginVertical: 16,
      textAlign: 'center',
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
    error: { 
      color: 'red', 
      marginBottom: 12,
      textAlign: 'center',
    },
    emptyMessage: { 
      textAlign: 'center', 
      marginTop: 20, 
      color: 'gray',
    },
  
  
  });