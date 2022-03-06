import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';


export default function AppItem({item, handleDeletePress, handleEditPress, children}) {

    console.log('item',item)
    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.textItem}>
                {item.description}
            </Text>
            <>{children}</>
            </View>
           
            
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeletePress}>
                    <Icon name="trash" color="white" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={handleEditPress}>
                    <Icon name="edit" color="white" size={18} />
                </TouchableOpacity>
               
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e3e3e6',
        marginTop: 10,
        marginHorizontal: 10,
        flex: 1,
        borderRadius: 10,
        width: '96%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        
        borderBottomColor: '#CCC',
        
        
    },
    editButton: {
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
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: '#9e0000',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 12,
    },
    textItem: {
        fontSize: 20,
        color: '#1f1f22',
        fontWeight: 'bold'
    }
});