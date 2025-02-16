import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#F0F0F0', // Gris clair pour le fond
    borderRadius: 12,  // Bords arrondis pour un effet plus doux
  },

  title: { 
    fontSize: 28, 
    fontWeight: '700', // Poids de la police pour une meilleure lisibilité
    color: '#121212', // Noir profond pour un contraste élevé
    marginBottom: 24, // Espacement plus large pour séparer des éléments
    textAlign: 'center',
  },

  input: { 
    borderColor: '#D6D6D6', // Gris neutre pour les bordures
    borderWidth: 1, 
    marginBottom: 16, 
    padding: 14, 
    borderRadius: 10, 
    fontSize: 18, // Taille plus grande pour la lisibilité
    backgroundColor: '#FFFFFF', // Fond blanc pour un contraste avec le texte
    color: '#121212', // Texte en noir
    width: '100%',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  background: {
    flex: 1,
    justifyContent: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16, // Espacement vertical plus important
  },

  button: {
    flex: 1,
    backgroundColor: '#007BFF', // Bleu professionnel
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  buttonText: {
    color: '#FFFFFF', // Texte en blanc
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },

  counter: {
    fontSize: 18,
    color: '#333', // Gris foncé pour le texte
    marginVertical: 20, 
    textAlign: 'center',
  },

  progressBarContainer: {
    height: 10,
    backgroundColor: '#D6D6D6', // Gris neutre
    borderRadius: 5,
    marginVertical: 14,
    width: '100%',
    overflow: 'hidden',
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#007BFF', // Bleu professionnel
  },

  error: { 
    color: '#E74C3C', // Rouge clair pour les erreurs
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },

  emptyMessage: { 
    textAlign: 'center', 
    marginTop: 20, 
    color: '#999', // Gris clair pour un texte moins important
    fontSize: 16,
  },
});
