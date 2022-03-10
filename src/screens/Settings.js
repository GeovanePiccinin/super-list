import React, { useContext } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { ThemeContext } from '../context/ThemeContext'

export default function Settings({ route, navigation }) {

    const theme = useContext(ThemeContext);

    const alternateColor = () => {
        if (theme.state.name === "GREEN")
            theme.dispatch({ type: "BLUE" });
        else
            theme.dispatch({ type: "GREEN" });
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.button} onPress={alternateColor}>
                <View style={{ padding: 5,width: 50, height: 50, backgroundColor: theme.state.baseColor }} />
                <Text style={{fontSize: 20}}>Alternate theme color</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4a4a4a',
        alignItems: 'center',
    },
    button: {
        borderRadius: 10,
        marginTop: 20,
        flexDirection: "row",
        backgroundColor: "#e3e3e6",
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        minHeight: 60
    }
})