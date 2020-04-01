import React from "react";
import { View, TouchableNativeFeedback, StyleSheet, Dimensions, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

function SearchEngine(props) {
    return (
        <View style={styles.border}>
        <TouchableNativeFeedback  onPress={props.onSelect}>
        <View style={styles.container}>
            <View style={styles.row}>
            <View style={styles.icon}>
                <Ionicons name="ios-search" size={25} />
            </View>
                <Text style={styles.title}>Konum, kent simgesi veya adres</Text>
            </View>
        </View>
        </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    border:{
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        marginVertical:Dimensions.get("window").height * 0.04,
        marginHorizontal: Dimensions.get("window").width * 0.03,
        overflow: "hidden"
    },
    container: {
        justifyContent: "center",
        alignItems:"center",
        width: Dimensions.get("window").width * 0.9,
        height: Dimensions.get("window").height * 0.05,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        width: Dimensions.get("window").width * 0.85
    },
    icon:{
        marginHorizontal: Dimensions.get("window").width * 0.025,  
    },
    title:{
        opacity:0.5
    }
})

export default SearchEngine;