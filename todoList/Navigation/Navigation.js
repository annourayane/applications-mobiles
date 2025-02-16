import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from '../Screen/HomeScreen';
import TodoListsScreen from '../Screen/TodoListsScreen';
import TodoListDetailsScreen from '../Screen/TodoListDetailsScreen'; 
import SignOutScreen from '../Screen/SignOutScreen';
import SignInScreen from '../Screen/SignInScreen';
import { TokenContext } from '../Context/Context';
import SignUpScreen from '../Screen/SignUpScreen';
import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();//cree un navigateur de bas de page
const Stack = createNativeStackNavigator(); //navigateur de pile 
                                             //pour baiger entre les les pages 

function TodoListStack() {
  return (
    <Stack.Navigator initialRouteName='List'>
      <Stack.Screen 
        name="List" 
        component={TodoListsScreen} 
        options={{ title: 'Mes TodoLists' }} 
      />
      <Stack.Screen 
        name="Details" 
        component={TodoListDetailsScreen} 
        options={{ title: 'Détails de la TodoList' }} 
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const [token] = useContext(TokenContext);//acceder a l'etat token 

  return (
    <View style={styles.container}>
       <NavigationContainer>
         {token ? (
           <Tab.Navigator
              screenOptions={{
                 tabBarActiveTintColor : 'red',
                 tabBarInactiveTintColor : 'grey',
   
                 tabBarStyle :{
                   backgroundColor: '#ffffff',
                 },
   
               }}>
             <Tab.Screen //onglet home
               name="Home" 
               component={HomeScreen} 
               options={{
                 tabBarIcon: ({ color, size }) => (
                   <Ionicons name="home-outline" size={size} color={color} />
                 )
               }} 
             />
             <Tab.Screen 
               name="TodoLists" //onglets todolists 
               component={TodoListStack} 
               options={{
                 tabBarIcon: ({ color, size }) => (
                   <Ionicons name="list-outline" size={size} color={color} />
                 )
               }} 
             />
             <Tab.Screen 
               name="SignOut" 
               component={SignOutScreen} 
               options={{
                 tabBarIcon: ({ color, size }) => (
                   <Ionicons name="log-out-outline" size={size} color={color} />
                 )
               }} 
             />
           </Tab.Navigator>
         ) : (//si le user n'est pas connecté
           <Tab.Navigator
              screenOptions={{
              tabBarActiveTintColor : 'red',
              tabBarInactiveTintColor : 'grey',
   
              tabBarStyle :{
               backgroundColor: '#ffffff',
             },
   
           }}>
             <Tab.Screen 
               name='SignIn' 
               component={SignInScreen} 
               options={{
                 tabBarIcon: ({ color, size }) => (
                   <Ionicons name="log-in-outline" size={size} color={color} />
                 )
               }} 
             />
             <Tab.Screen 
               name='SignUp' 
               component={SignUpScreen} 
               options={{
                 tabBarIcon: ({ color, size }) => (
                   <Ionicons name="person-add-outline" size={size} color={color} />
                 )
               }} 
             />
           </Tab.Navigator>
         )}
       </NavigationContainer>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ffa07a', 
  },
});
