import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import Database from '../Database';

export const TODO_LIST = 'todo-list'

export default function TodoForm({ route, navigation }) {
  const id = route.params ? route.params.id : undefined;
  const [description, setdescription] = React.useState('');

  React.useEffect(() => {
    if (!route.params) return;
    setdescription(route.params.description);
  }, [route])

  function handleDescriptionChange(description) { setdescription(description); }

  async function handleSaveButtonPress() {

    if (!description) {
      Toast.show({
        type: 'error',
        text1: 'Description is required',
        position: 'bottom'
      });
      return;
    }

    const listItem = { description };
    Database.saveItem(TODO_LIST, listItem, id)
      .then(response => {
        setdescription('')
        navigation.navigate("TodoList", listItem)
        Toast.show({
          type: 'success',
          text1: 'Nice!',
          text2: 'Record saved!'
        });
      });
  }

  async function handleCancelButtonPress() {
    setdescription('')
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleDescriptionChange}
        placeholder="Todo description"
        clearButtonMode="always"
        value={description} />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handleCancelButtonPress}>
          <View style={styles.buttonContainer}>

            <Text style={styles.buttonText}>Cancel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSaveButtonPress}>
          <View style={styles.buttonContainer}>
            <Icon name="save" size={22} color="white" />
            <Text style={styles.buttonText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a4a4a',
    alignItems: 'center',
  },
  input: {
    width: '96%',
    marginTop: 10,
    height: 60,
    backgroundColor: '#e3e3e6',
    color: "#1f1f22",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch'
  },
  button: {

    marginTop: 10,
    marginLeft: 5,
    height: 50,
    backgroundColor: '#03b898',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,

    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
    width: '36%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  controls: {
    flexDirection: "row",
    width: '96%',
    justifyContent: 'flex-end'
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
});