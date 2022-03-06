import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, FlatList, View, Text, SafeAreaView, Alert, TouchableOpacity } from 'react-native';

import AppItem from '../components/AppItem'
import Database from '../Database'
import { SHOP_LIST } from './ShopForm';

const ORDER_BY_ID = 'order-by-id'
const ORDER_BY_DESCRIPTION = 'order-by-description'


export default function ShopList({ route, navigation }) {

  const [items, setItems] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState(ORDER_BY_ID)

  React.useEffect(() => {
    console.log('vai chamar a list shop')
    fetchDatabase()
  }, [route]);

  function fetchDatabase() {
    Database.getItems(SHOP_LIST).then(items => setItems(items));
  }

  async function handleEditPress(list, id) {
    const item = await Database.getItem(list, id);
    navigation.navigate("ShopForm", item);
  }

  function handleOrderByDescription() {
    setOrderBy(ORDER_BY_DESCRIPTION)
    setItems(items.sort(function (a, b) {
      if (a.description > b.description) {
        return 1;
      }
      if (a.description < b.description) {
        return -1;
      }
      return 0;
    }))
  }

  function handleOrderById() {
    setOrderBy(ORDER_BY_ID)
    setItems(items.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    }))
  }

  function handleDeletePress(list, id) {
    Alert.alert(
      "Atenção",
      "Você tem certeza que deseja excluir este item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Sim", onPress: () => {
            Database.deleteItem(list, id)
              .then(response => fetchDatabase());
          }
        }
      ],
      { cancelable: false }
    );
  }

  console.log('items', JSON.stringify(items))

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.orderByContainer}>
        <TouchableOpacity
          onPress={handleOrderById}>
          <Text style={orderBy === ORDER_BY_ID ? styles.textOrderByActivated : styles.textOrderByInactive}>Order by ID</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOrderByDescription}>
          <Text style={orderBy === ORDER_BY_DESCRIPTION ? styles.textOrderByActivated : styles.textOrderByInactive}>Order by Description</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <AppItem
            item={item}
            navigation={navigation}
            handleDeletePress={() => handleDeletePress(SHOP_LIST, item.id)}
            handleEditPress={() => handleEditPress(SHOP_LIST, item.id)}
          >
            <Text>{item.amount}</Text>
          </AppItem>)}
        ListEmptyComponent={<Text style={styles.textEmptyList}>0 items.</Text>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a4a4a',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  textEmptyList: {
    color: "#fff",
    padding: 10,
  },
  orderByContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  textOrderByActivated: { fontWeight: 'bold' ,
    color: '#3dcc8e',
    padding: 5,
  },
  textOrderByInactive: { fontWeight: 'bold' ,
    color:'#d6d6d6',
    padding: 5
  }
});