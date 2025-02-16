import React, { useState, useContext } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context'; 
import { signIn } from '../js/sign'; 
import { styles } from '../styles/styleSignIn'; 

export default function SignInScreen({ navigation }) {
  
  const [, setUsername] = useContext(UsernameContext); // on a besoin que de lafonction de la mise a jour 
  const [, setToken] = useContext(TokenContext);

  const [inputUsername, setInputUsername] = useState(''); //stocker le username saisi par le user 
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction de gestion de la connexion
  const handleSignIn = async () => {
    try {
      const token = await signIn(inputUsername, password); /**enoyer les donnees stockes a signIn
                                                            elle renvoie un jeton */
      setUsername(inputUsername); /**si la connextion reussi 
                                   mise a jour du contexte global */
      setToken(token);
      navigation.navigate('Home'); // Redirige vers l'ecran d'accueil apres connexion reussie
      
    } catch (error) {
      setErrorMessage(error.message); // Affiche le message d'erreur en cas d'echec
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/bleu.png')}
      style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign In</Text>
          <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Username'
                value={inputUsername}
                onChangeText={setInputUsername}
              />
              <TextInput
                style={styles.input}
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
           </View>
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null} {/* Affiche le message d'erreur s'il y en a */}
          
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
    
          {/* Bouton pour aller à l'écran Sign Up */}
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
    </ImageBackground>
  );
}


