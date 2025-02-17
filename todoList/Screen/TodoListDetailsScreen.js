import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import { UsernameContext, TokenContext } from '../Context/Context';
import TodoItem from '../components/TodoItem'; // Assurez-vous que TodoItem est importe
import { styles } from '../styles/styledetail'; 

const API_URL = 'http://graphql.unicaen.fr:4000';

// requete GraphQL pour recuperer les Todos (taches) d'une TodoList
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

//creer une tache dans une todoliste

// requete GraphQL pour ajouter une nouvelle Todo
const ADD_TODO_MUTATION = `
mutation CreateTodos($input: [TodoCreateInput!]!) {
  createTodos(input: $input) {
    todos {
      id
      done
      content
    }
  }
}
`;

// requete GraphQL pour mettre a jour une Todo
const UPDATE_TODO_MUTATION = `
mutation UpdateTodos($update: TodoUpdateInput, $where: TodoWhere) {
  updateTodos(update: $update, where: $where) {
    todos {
      id
      done
      content
    }
  }
}
`;

// requete GraphQL pour supprimer une Todo
const DELETE_TODO_MUTATION = `
mutation DeleteTodo($where: TodoWhere) {
  deleteTodos(where: $where) {
    nodesDeleted
  }
}
`;

export default function TodoListDetailsScreen({ route }) {
  const { todoListId, title } = route.params;
  const [todos, setTodos] = useState([]);  //liste des taches 
  const [newTodoText, setNewTodoText] = useState('');  //titre de la nouvellet tache 
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);  //inidcateur de chargement 
  const [token] = useContext(TokenContext);  //recupere le token de connexion 

  //recupere les todos d'une liste specifique 

  const fetchTodosForTodoList = async () => {
    setLoading(true); //demarre le chargement 
    try {
      //
      const response = await fetch(API_URL, { //fetch : envoie une requete a une URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          query: GET_TODOS_FOR_TODOLIST_QUERY,
          variables: { where: { belongsTo: { id: todoListId } } },
        }),
      });

      const jsonResponse = await response.json();
      if (jsonResponse.errors) throw new Error(jsonResponse.errors[0].message);

      setTodos(jsonResponse.data.todos || []);/**la requete a reussi renvoie 
                                              les taches contenue dans l'objet data 
                                              et donc on met a jour les taches */
      setErrorMessage(''); 
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new Todo
  const addTodo = async () => {
    if (newTodoText.trim() === '') return;//si la chaine evide ne rien faire 

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          query: ADD_TODO_MUTATION,
          variables: {
            input: [{
              content: newTodoText, /**parametre pour 
                                        creer la tache  */
              done: false,
              belongsTo: { connect: { where: { id: todoListId } } } //association de cette tache a une todolis
            }],
          },
        }),
      });

      const jsonResponse = await response.json();
      if (jsonResponse.errors) throw new Error(jsonResponse.errors[0].message);

      setNewTodoText(''); //vider l'input apres l'ajout de de la tache 
      await fetchTodosForTodoList(); // met a jour la liste des taches 
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // bascule l'etat du  done d'une tache 
  const toggleTodoDone = async (todoId, done) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          query: UPDATE_TODO_MUTATION,
          variables: { 
            update: { done }, //  la mise a jour 
            where: { id: todoId, belongsTo: { id: todoListId } } //specifier le todo  
          },
        }),
      });
      
      //reponse de l'api 
      const jsonResponse = await response.json();
      if (jsonResponse.errors) throw new Error(jsonResponse.errors[0].message);

      await fetchTodosForTodoList(); //rafraichit la todolist pour afficher la mise a jour 
    } catch (error) {
      setErrorMessage(error.message);
    }
  };


  // Fonction pour marquer tous les todos comme termines
  const tousTodosDone = async () => {
  try {
    const response = await fetch(API_URL, { //envoie une requete 
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        query: UPDATE_TODO_MUTATION,
        variables: { 
          update: { done: true },
          where: { belongsTo: { id: todoListId } } // tou les todos 
        },
      }),
    });

    const jsonResponse = await response.json();
    if (jsonResponse.errors) throw new Error(jsonResponse.errors[0].message);

    // Mettre a jour la liste après la modification avec les nouveautés 
    await fetchTodosForTodoList(); 
  } catch (error) {
    setErrorMessage(error.message);
  }
  };


   // Fonction pour marquer tous les todos comme non termines
   const tousTodosNotDone = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          query: UPDATE_TODO_MUTATION,
          variables: { 
            update: { done: false }, 
            where: { belongsTo: { id: todoListId } }
          },
        }),
      });
  
      const jsonResponse = await response.json();
      if (jsonResponse.errors) throw new Error(jsonResponse.errors[0].message);
  
      // Mettre a jour la liste après la modification
      await fetchTodosForTodoList(); 
    } catch (error) {
      setErrorMessage(error.message);
    }
    };

  // fonction pour afficher que les todos termines 
  
  const tachesTermines = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          query: GET_TODOS_FOR_TODOLIST_QUERY,
          variables: { where: { done : true , belongsTo: { id: todoListId } } },
        }),
      });

      const jsonResponse = await response.json();
      if (jsonResponse.errors) throw new Error(jsonResponse.errors[0].message);

      setTodos(jsonResponse.data.todos || []);
      setErrorMessage(''); // Reset error message on successful fetch
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  // fonction pour afficher que les todos non termines 
  
  const tachesNonTermines = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          query: GET_TODOS_FOR_TODOLIST_QUERY,
          variables: { where: { done : false , belongsTo: { id: todoListId } } },
        }),
      });

      const jsonResponse = await response.json();
      if (jsonResponse.errors) throw new Error(jsonResponse.errors[0].message);

      setTodos(jsonResponse.data.todos || []);
      setErrorMessage(''); // Reset error message on successful fetch
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a Todo
  const deleteTodo = async (todoId) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          query: DELETE_TODO_MUTATION,
          variables: { where: { id: todoId } },// id du todo a supprimer 
        }),
      });

      const jsonResponse = await response.json();
      if (jsonResponse.errors) throw new Error(jsonResponse.errors[0].message);

      await fetchTodosForTodoList(); // Refresh the Todo list
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  // Calcul du nombre de taches terminees et du total
  const completedTodosCount = todos.filter(todo => todo.done).length;
  const totalTodosCount = todos.length;



  useEffect(() => {
    fetchTodosForTodoList();
  }, [todoListId]);  //a chaque fois que l'id de la todoListe change  la fonction recupere les nouvelles donnees 
                               
  return (
    <ImageBackground 
      source={require('../assets/todoooo.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
  
        <TextInput
          style={styles.input}
          value={newTodoText}
          onChangeText={setNewTodoText} //a chaque modif du text on appelle la fonction 
          placeholder="Ajouter une nouvelle tache"
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={addTodo} disabled={!newTodoText.trim()}>
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={tousTodosDone}>
            <Text style={styles.buttonText}>Marquer Tout Termine</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={tousTodosNotDone}>
            <Text style={styles.buttonText}>Marquer Tout Non Termine</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={fetchTodosForTodoList}>
            <Text style={styles.buttonText}>Afficher Tout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={tachesTermines}>
            <Text style={styles.buttonText}>Voir Termines</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={tachesNonTermines}>
            <Text style={styles.buttonText}>Voir Non Termines</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.counter}>
          {completedTodosCount} / {totalTodosCount} Taches Terminees
        </Text>
        <View style={styles.progressBarContainer}>
        <View
        style={[
          styles.progressBarFill,
          { width: `${totalTodosCount === 0 ? 0 : (completedTodosCount / totalTodosCount) * 100}%` },
        ]}
        />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList  //liste deroulante 
            data={todos}
            keyExtractor={(item) => item.id.toString()}//fournit une cle pour chaque todo selon son id 
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onToggle={() => toggleTodoDone(item.id, !item.done)}
                onDelete={() => deleteTodo(item.id)}
              />
            )}
            ListEmptyComponent={<Text style={styles.emptyMessage}>Aucune tache a afficher.</Text>}
          />
        )}

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>
    </ImageBackground>
  );
}

