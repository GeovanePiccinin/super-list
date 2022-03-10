import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather as Icon } from '@expo/vector-icons';
import { StyleSheet } from 'react-native'

import TodoList from '../screens/TodoList';
import TodoForm from '../screens/TodoForm';

const TodoStack = createNativeStackNavigator();

export default function TodoStackNavigation() {
  return (
    <TodoStack.Navigator>
      <TodoStack.Screen name="TodoList" component={TodoList}
        options={({ navigation }) => ({
          title: 'Todo List',
          headerStyle: {
            backgroundColor: '#00c68e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Icon
              name="plus"
              type="feather"
              color="#fff"
              size={23}
              style={style.headerIcon}
              onPress={() => navigation.navigate('TodoForm')}
            />
          )
        })} />
      <TodoStack.Screen name="TodoForm"
        component={TodoForm}
        options={{
          title: "Task",
          headerStyle: {
            backgroundColor: '#00c68e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </TodoStack.Navigator>
  );
}

const style = StyleSheet.create({
  headerIcon: {
    marginRight: 10
  }
});