import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import { Ionicons } from "@expo/vector-icons"
import Colors from "../constants/Colors"

function AccountSettingsList(props) {
    return (
        <View>
            <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.5} style={styles.infoContainer} onPress={props.onSelect}>
                <Text style={{...styles.info, ...props.style}}>{props.title}</Text>
                <Ionicons name={props.icon} size={26}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: Dimensions.get("window").width * 0.08,
        paddingTop: Dimensions.get("window").height * 0.04,
        borderBottomWidth:1,
        borderBottomColor:"#ccc"
    },
    infoContainer:{
        height:Dimensions.get("window").height * 0.07,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    info:{
        fontFamily: "open-sans",
        fontSize: 17
    }
})

export default AccountSettingsList;