import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#F0F0F0' // Gris clair pour un fond épuré
  },

  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#121212', // Noir profond
    marginBottom: 20,
    textAlign: 'center',
  },

  progressContainer: { 
    marginBottom: 20, 
    alignItems: 'center' 
  },

  progressText: { 
    fontSize: 22, 
    color: '#007BFF', // Bleu professionnel
    fontWeight: '600',
    marginBottom: 8,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  todoItem: {
    padding: 14,
    backgroundColor: '#FFFFFF', // Blanc propre
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Ombre sur Android
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  todoListCard: {
    padding: 15,
    backgroundColor: '#D6D6D6', // Gris neutre
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },

  listTitle: { 
    fontSize: 22, 
    fontWeight: '600', 
    color: '#1E1E1E' // Noir élégant
  },

  ownerText: { 
    fontSize: 16, 
    color: '#666' 
  },

  icon: { 
    height: 28, 
    width: 28 
  },

  error: { 
    color: 'red', 
    fontSize: 16, 
    marginBottom: 12 
  },

  buttonContainer: {
    alignItems: 'center', 
    marginBottom: 20,
  },

  buttonText: {
    color: '#FFFFFF', // Texte blanc
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },

  input: {
    height: 50,
    borderColor: '#D6D6D6', 
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    fontSize: 18,
    color: '#121212',
    marginBottom: 15,
    width: '85%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  button: {
    backgroundColor: '#007BFF', // Bleu professionnel
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    width: '60%',
    alignSelf: 'center',
  },

  progressBarContainer: {
    height: 10,
    backgroundColor: '#D6D6D6', // Gris clair pour une barre neutre
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    overflow: 'hidden',
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#007BFF', // Bleu accent
  },
});
