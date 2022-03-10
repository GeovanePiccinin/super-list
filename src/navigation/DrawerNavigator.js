import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator"
import Settings from "../screens/Settings"

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const theme = useContext(ThemeContext);
  
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.state.baseColor },
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
            backgroundColor: theme.state.baseColor,
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