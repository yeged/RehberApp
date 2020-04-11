import React from "react"
import { View, Text, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Dimensions } from "react-native"
import Colors from "../constants/Colors"



const CustomButton = props => {
    return (
        <View style={styles.screen}>
        <TouchableNativeFeedback useForeground onPress={props.onSelect}>
            <View style={styles.container}>
                <Text style={styles.text}>Ev sahibiyle iletişime geçin</Text>
            </View>
        </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        paddingVertical:Dimensions.get("window").height * 0.07
    },
    container: {
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "white",
        paddingVertical: Dimensions.get("window").height * 0.02,
        backgroundColor: Colors.detailbgColor,
        overflow: "hidden"
    },
    text: {
        color: "white",
        fontFamily: "open-sans"
    }
})

export default CustomButton;