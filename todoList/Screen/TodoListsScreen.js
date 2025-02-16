import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { UsernameContext, TokenContext } from '../Context/Context';
import Input from '../components/UI/Input';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../styles/styletodolist'; 

const API_URL = 'http://graphql.unicaen.fr:4000';
  //gestion des todolistes 
// requete GraphQL
const GET_TODOLISTS_QUERY = `
query TodoLists($where: TodoListWhere) {
  todoLists(where: $where) {
    id
    title
    owner {
      username
    }
  }
}
`;

const GET_TODOS_FOR_TODOLIST_QUERY = `
query Todos($where: TodoWhere) {
  todos(where: $where) {
    id
    content
    done
    belongsTo {
      title
    }
  }
}
`;

const DELETE_TODOLIST_MUTATION = `
mutation DeleteTodoLists($where: TodoListWhere) {
  deleteTodoLists(where: $where) {
    nodesDeleted
  }
}
`;

const CREATE_TODOLIST_MUTATION = `
mutation createTodoLists($input: [TodoListCreateInput!]!) {
  createTodoLists(input: $input) {
    todoLists {
      id
      owner {
        username
      }
      title
    }
  }
}
`;

export default function TodoListsScreen() {
  const [todoLists, setTodoLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [username] = useContext(UsernameContext);
  const [token] = useContext(TokenContext);
  const [newTodoListTitle, setNewTodoListTitle] = useState('');
  const [loading, setLoading] = useState(true); // etat de chargement
  const [totalTasks, setTotalTasks] = useState(0); // Nombre total de taches
  const [completedTasks, setCompletedTasks] = useState(0); // Nombre de taches terminees
  const navigation = useNavigation();

  // Fonction pour recuperer toutes les TodoLists du user 
  const fetchTodoLists = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', //inidique le format des donnees envoyes 
          'Authorization': `Bearer ${token}`, //securiser la requete 
        },
        body: JSON.stringify({
          query: GET_TODOLISTS_QUERY,
          variables: { where: { owner: { username } } }, //critere de la requete 
        }),
      });

      const jsonResponse = await response.json(); //parser la reponse 
      if (jsonResponse.errors) throw new Error(jsonResponse.errors[0].message);

      const fetchedTodoLists = jsonResponse.data.todoLists || [];
      setTodoLists(fetchedTodoLists); //mettre a jour les todolist

      // Recuperer les todos pour chaque TodoList
      let totalTodos = 0;
      let doneTodos = 0;

      for (const list of fetchedTodoLists) {
        const todos = await fetchTodosForTodoList(list.id);
        totalTodos += todos.length;
        doneTodos += todos.filter(todo => todo.done).length;
      }

      setTotalTasks(totalTodos);
      setCompletedTasks(doneTodos);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  // Fonction pour recuperer les Todos d'une TodoList
  const fetchTodosForTodoList = async (todoListId) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: GET_TODOS_FOR_TODOLIST_QUERY,
          variables: { where: { belongsTo: { id: todoListId } } },
        }),
      });

      const jsonResponse = await response.json();
      if (jsonResponse.errors) throw new Error(jsonResponse.errors[0].message);

      return jsonResponse.data.todos || [];
    } catch (error) {
      setErrorMessage(error.message);
      return [];
    }
  };

  // fonction pour supprimer une todolist 
  const deleteTodoList = async (todoListId) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: DELETE_TODOLIST_MUTATION,
          variables: {
            where: {
              id: todoListId,
            },
          },
        }),
      });

      const jsonResponse = await response.json();
      if (jsonResponse.errors) {
        throw new Error(jsonResponse.errors[0].message);
      }

      // Reactualiser la liste des TodoLists après la suppression
      fetchTodoLists();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Fonction pour creer une nouvelle TodoList
  const createTodoList = async () => {
    const trimmedTitle = newTodoListTitle.trim();

    if (trimmedTitle === '') {
      setErrorMessage('Le titre de la TodoList ne peut pas être vide.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: CREATE_TODOLIST_MUTATION,
          variables: {
            input: [
              {
                title: trimmedTitle,
                owner: {
                  connect: { where: { username } },
                },
              },
            ],
          },
        }),
      });

      const jsonResponse = await response.json();
      if (jsonResponse.errors) {
        throw new Error(jsonResponse.errors[0].message);
      }

      setNewTodoListTitle('');
      fetchTodoLists(); // Reactualiser la liste des TodoLists après la creation
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => { //mise  a jour des donnees 
    if (username) fetchTodoLists(); /**permet de recuperer les todolistes desque 
                                         le username change (il surveille le changement de username ) */
  }, [username]);

  return (
    <ImageBackground 
        source ={require('../assets/todoooo.png')} 
        style={styles.backgroundImage}
        >
    <  View style={styles.container}>
        <Text style={styles.title}>Todo Lists</Text>
  
        {/* Affichage du nombre de taches realisees / total */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>votre progression : 
            {completedTasks} taches realisees sur {totalTasks}
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
        <View
        style={[
          styles.progressBarFill,
          { width: `${totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100}%` },
        ]}
        />
        
        </View>

       
        <View style= {styles.input}>
         
          <Input  //appel du composant Input.js
            style={{ fontSize: 70, borderWidth: 1, borderColor: 'black' }}
            placeholder="Ajouter une nouvelle Todo List"
            onSubmit={(value) => {   //titre de la nouvelle todolist
              setNewTodoListTitle(value);
              createTodoList();
            }}
            value={newTodoListTitle}
            onChangeText={(text) => {
              setNewTodoListTitle(text); //met a jour lors de l'ecriture 
              setErrorMessage('');
            }}
            icon={<Icon name="plus" size={20} color="#fff" />}
            //style={styles.input}
          />
        </View> 

        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.button} onPress={createTodoList}> 
            <Icon name="plus" size={20} color="#fff" />
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>
        </View>
  
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
  
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
         ) : (
           <FlatList
             data={todoLists}
             keyExtractor={(item) => item.id.toString()}
             renderItem={({ item }) => ( //fonction qui definit le rendu de chaque element 
               <View style={styles.todoItem}>
                 <TouchableOpacity
                   onPress={() => //en appuiyant sur une todolist
                     navigation.navigate('Details', { todoListId: item.id, title: item.title })
                   }
                   style={styles.todoListCard}
                 >
                   <Text style={styles.listTitle}>{item.title}</Text>
                   <Text style={styles.ownerText}>{item.owner.username}</Text>
   
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => deleteTodoList(item.id)}>
                   <Image source={require('../assets/poubelle.png')} style={styles.icon} />
                 </TouchableOpacity>
               </View>
             )}
           />
         )}
       </View>
    </ImageBackground>
  );
}

