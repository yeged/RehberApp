import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import {Ionicons} from "@expo/vector-icons"

import DefaultTitle from "../components/DefaultTitle"
import { Colors } from "react-native/Libraries/NewAppScreen";

const ProfileScreen = (props) => {
    return (
        <View style={styles.screen}>
        <View style={styles.headerContainer}>
        <View style={styles.nameContainer}>
            <DefaultTitle numberOfLines={2} style={styles.name}>Yiğit Yavuz Ceylan</DefaultTitle>
        </View>
        <TouchableOpacity activeOpacity={0.65} style={styles.iconContainer}>
            <Ionicons name="ios-person-add" size={50}   />
            </TouchableOpacity>
        </View>
        </View>
    )
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width:"100%",
    },
    headerContainer:{
        flexDirection:"row",
        justifyContent: "space-between",
        height:Dimensions.get("window").height * 0.25,
        paddingHorizontal:Dimensions.get("window").width * 0.08,  
        paddingVertical:60,
        backgroundColor:"#C0D6E4",
        borderBottomWidth:1,
        borderBottomColor: "#ccc",
        elevation:2,
        overflow: "hidden"
        
    },
    nameContainer:{
        width:"70%",
        
        
    },
    iconContainer:{
        borderWidth:1,
        borderRadius:110,
        backgroundColor: "grey",
        width: "30%",
        height: "180%",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:15
    },
    name:{
        fontSize:24
    }
})

export default ProfileScreen