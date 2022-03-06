import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import Database from '../Database';

export const SHOP_LIST = 'shop-list'

export default function ShopForm({ route, navigation }) {
  const id = route.params ? route.params.id : undefined;
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState(0);

  React.useEffect(() => {
    if (!route.params) return;
    setDescription(route.params.description);
    setAmount(route.params.amount);
  }, [route])

  function handleDescriptionChange(description) { 
    setDescription(description) 
  }

  function handleAmountChange(value) { 
    setAmount(Number(value.replace(/[^0-9]/g, ''))) 
    
  }

  async function handleSaveButtonPress() {
    if (!description || !amount) {
      Toast.show({
        type: 'error',
        text1: 'Description and amount are required',
        position: 'bottom'
      });
      return;
    }

    const listItem = { description, amount };
    Database.saveItem(SHOP_LIST, listItem, id)
      .then(response => {
        setDescription('')
        setAmount(0)
        navigation.navigate("ShopList", listItem)
        Toast.show({
          type: 'success',
          text1: 'Nice!',
          text2: 'Record saved!'
        });
      });
  }

  async function handleCancelButtonPress() {
    setDescription('')
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleDescriptionChange}
        placeholder="Item"
        
        clearButtonMode="always"
        value={description} />

        <View style={styles.amountContainer} >
        <TextInput
        style={styles.inputAmount}
        onChangeText={handleAmountChange}
        placeholder="Amount"
        clearButtonMode="always"
        keyboardType='numeric'
        maxLength={10} 
        value={amount.toString()} />

      <TouchableOpacity
        style={styles.incrementAmount}
        onPress={() => setAmount(prevAmount => prevAmount + 1)}>
        <Icon name="plus" color="white" size={18} />
      </TouchableOpacity>
        </View>
      

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

  inputAmount: {
    width: '88%',
    marginTop: 10,
    height: 60,
    backgroundColor: '#e3e3e6',
    color: "#1f1f22",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch'
  },

  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    width: '96%',
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
  },
  incrementAmount: {   
      marginLeft: 10,
      height: 40,
      backgroundColor: '#03b898',
      borderRadius: 10,
      padding: 10,
      fontSize: 12,
      elevation: 10,
      shadowOpacity: 10,
      shadowColor: '#ccc',
      alignItems: 'center'
  
  }
});