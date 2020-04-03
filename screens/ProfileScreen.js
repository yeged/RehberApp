import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {Ionicons} from "@expo/vector-icons"

const ProfileScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Hellow</Text>
            <Ionicons name="ios-person-add" size={100} onPress={() => console.log("sa")} />
        </View>
    )
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ProfileScreen