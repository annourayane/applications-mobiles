import React, { useState, useContext } from 'react'; 
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context'; 
import { signUp } from '../js/sign'; 
import { styles } from '../styles/stylesSignUp'; 


export default function SignUpScreen({ navigation }) {
  const [, setUsername] = useContext(UsernameContext); // Utilise le contexte pour le nom d'utilisateur
  const [, setToken] = useContext(TokenContext); // Utilise le contexte pour le jeton

  const [inputUsername, setInputUsername] = useState(''); // etat pour le nom d'utilisateur
  const [password, setPassword] = useState(''); // etat pour le mot de passe
  const [errorMessage, setErrorMessage] = useState(''); // etat pour gerer les messages d'erreur

  // Fonction qui gère l'inscription de l'utilisateur
  const handleSignUp = async () => {
    try {
      const token = await signUp(inputUsername, password); // Appel de la fonction signUp importee
      setUsername(inputUsername); // mise a jour du le username dans le contexte
      setToken(token); // mise a jour du context 

      // Rediriger vers l'ecran de connexion après l'inscription reussie
      navigation.navigate('SignIn');
    } catch (error) {
      setErrorMessage(error.message); // Affiche un message d'erreur si l'inscription echoue
    }
  };

  // Rendu du formulaire d'inscription
  return (
    <ImageBackground source={require('../assets/bleu.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder='Username'
          value={inputUsername}
          onChangeText={setInputUsername} // mise a jour de  l'etat avec le username saisi
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword} //  mise a jour de  l'etat de  l'etat avec le mot de passe saisi
          secureTextEntry // masquage du mdp
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}


