import React from "react";
import {View, TextInput, StyleSheet} from "react-native"
import SearchScreen from "../screens/SearchScreen"

function SearchEngine(props) {
    return(
        <View style={styles.container}>
            <TextInput placeholder="Konum,kent veya adres"></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderRadius:20,
        paddingHorizontal:30
    }
})

export default SearchEngine;