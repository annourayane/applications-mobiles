import React, { useContext } from 'react';
import { View, Button, StyleSheet,TouchableOpacity, ImageBackground,Text } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context';
import { styles } from '../styles/styleSignOutScreen'; 

export default function SignOutScreen({ navigation }) {
  const [_, setToken] = useContext(TokenContext);
  const [__, setUsername] = useContext(UsernameContext);

  const handleSignOut = () => {
    setToken(null);
    setUsername(null); // reinitialise le nom d'utilisateur
    navigation.navigate('Home');
  };

  return (

    <ImageBackground
       source = {require('../assets/bleu.png')}
       style= {styles.container}
       >
       <View style={styles.container}>
       <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign me out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>   
  );
}




