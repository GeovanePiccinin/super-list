import React from 'react';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShoppingStackNavigation from './ShoppingStackNavigation'
import TodoStackNavigation from './TodoStackNavigation'



const { Navigator, Screen } = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: "#32264d",
                tabBarInactiveTintColor: "#c1bccc",
                tabBarActiveBackgroundColor: "#ebebf5",
                tabBarInactiveBackgroundColor: "#fafafc",
                headerStyle: {
                    backgroundColor: '#2176FF'
                },
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 13,
                    position: 'absolute',
                    top: 15,
                    bottom: 0,
                    left: 0,
                    right: 0
                },
                tabBarIconStyle: { display: "none" }
            }}
        >
            <Screen name="TodoListNavigator" component={TodoStackNavigation}
                options={{
                    tabBarLabel: "Todo List"
                }}
            />
            <Screen name="ShopListNavigator" component={ShoppingStackNavigation}
                options={{
                    tabBarLabel: "Shopping List"
                }}
            />
        </Navigator>


    );
}

export default TabNavigator;