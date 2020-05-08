import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons"

import DefaultTitle from "../components/DefaultTitle"
import AccountSettingsList from "../components/AccountSettingsList"
import ImgPicker from "../components/ImagePicker"
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth"


const ProfileScreen = (props) => {

    const dispatch = useDispatch()

    return (
        <View style={styles.screen}>
            <View style={styles.headerContainer}>
                <View style={styles.nameContainer}>
                    <DefaultTitle numberOfLines={2} style={styles.name}>Yiğit Yavuz Ceylan</DefaultTitle>
                </View>
                <TouchableOpacity activeOpacity={0.65} style={styles.iconContainer}>
                    <Ionicons name="ios-person-add" size={50} />
                </TouchableOpacity>
            </View>
            <View style={styles.settingsContainer}>
                <Text style={styles.settings}>HESAP AYARLARI</Text>
            </View>
            <AccountSettingsList title="Kişisel Bilgiler" icon="ios-person" onSelect={() => {requestAnimationFrame(() => props.navigation.navigate("Info"))}}/>
            <AccountSettingsList title="Rehber Ol" icon="ios-home" onSelect={() => {requestAnimationFrame(() => props.navigation.navigate("BeGuide"))}}/>
            <AccountSettingsList style={styles.title} title="Çıkış Yap" onSelect={() => {
                dispatch(authActions.logOut())
               
            }} />
            <ImgPicker />
        </View>
    )
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: "100%",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: Dimensions.get("window").height * 0.25,
        paddingHorizontal: Dimensions.get("window").width * 0.08,
        paddingVertical: Dimensions.get("window").height * 0.088,
        backgroundColor: "#C0D6E4",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        elevation: 2,
        overflow: "hidden"

    },
    nameContainer: {
        width: "70%",
    },
    iconContainer: {
        borderWidth: 1,
        borderRadius: Dimensions.get("window").height * 0.1,
        backgroundColor: "#505560",
        width: "30%",
        height: "180%",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: Dimensions.get("window").width * 0.04
    },
    settingsContainer:{
        paddingHorizontal: Dimensions.get("window").width * 0.08,
        paddingTop: Dimensions.get("window").height * 0.05
    },
    name: {
        fontSize: 24
    },
    settings:{
        color: "grey",
        fontFamily: "open-sans",
        fontSize: 14
    },
    title:{
        color:"red"
    }
})

export default ProfileScreen