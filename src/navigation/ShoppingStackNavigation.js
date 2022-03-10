import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopForm from '../screens/ShopForm';
import ShopList from '../screens/ShopList'
import { Feather as Icon } from '@expo/vector-icons';
import { StyleSheet } from 'react-native'
import { ThemeContext } from "../context/ThemeContext";

const ShoppingStack = createNativeStackNavigator();

export default function ShoppingStackNavigation() {

    const theme = useContext(ThemeContext);

    return (
        <ShoppingStack.Navigator>
            <ShoppingStack.Screen name="ShopList" component={ShopList} 
            options={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: theme.state.baseColor,
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
                        onPress={() => navigation.navigate('ShopForm')}
                    />
                )
            })} />           
            <ShoppingStack.Screen name="ShopForm"
                component={ShopForm}
                options={{
                    title: "Shopping Item",
                    headerStyle: {
                        backgroundColor: theme.state.baseColor,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </ShoppingStack.Navigator>
    );
}

const style = StyleSheet.create({
    headerIcon: {
        marginRight: 10
    }
});