import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator"
import Settings from "../screens/Settings"

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#00c68e'},
        headerTitleStyle: {color: "#fff"},
        drawerStyle: {
          backgroundColor: '#e3e3e6',
          
        },
      }}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: '#00c68e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;