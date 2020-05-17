import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Image, Button, AsyncStorage } from "react-native";


import DefaultTitle from "../components/DefaultTitle"
import AccountSettingsList from "../components/AccountSettingsList"
import { useSelector, useDispatch } from "react-redux";
import * as profileActions from "../store/actions/profile"
import * as authActions from "../store/actions/auth"
import Colors from "../constants/Colors"



const ProfileScreen = (props) => {

    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const userProfile = useSelector(state => state.profile.profile)
    const dispatch = useDispatch()

    const loadProfile = useCallback(async () => {
        const userData = await AsyncStorage.getItem("userData")
        const transformedData = JSON.parse(userData)
        const { token, userId, expiryDate } = transformedData

        setError(null)
        try {
            await dispatch(profileActions.setSelectedProfile(userId))
        } catch (err) {
            setError(err.message)
        }

    }, [dispatch, setError,])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener("willFocus", loadProfile)

        return () => {
            willFocusSub.remove()
        }
    }, [loadProfile])


    useEffect(() => { 
        loadProfile().then(() => {
            setIsLoading(false)
        })

    }, [dispatch, loadProfile])


    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occured!</Text>
                <Button title="try again" onPress={loadProfile} />
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.detailbgColor} />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <View style={styles.headerContainer}>
                <View style={styles.nameContainer}>
                    <DefaultTitle numberOfLines={2} style={styles.name}>{userProfile[0].fname +" "+ userProfile[0].lname} </DefaultTitle>
                </View>
                <View style={styles.iconContainer}>
                    <Image resizeMode="cover" style={styles.pImage} source={{ uri: userProfile[0].photo }} />
                </View>
            </View>
            <View style={styles.settingsContainer}>
                <Text style={styles.settings}>HESAP AYARLARI</Text>
            </View>
            <AccountSettingsList title="Kişisel Bilgiler" icon="ios-person" onSelect={() => { requestAnimationFrame(() => props.navigation.navigate("Info")) }} />
            <AccountSettingsList title="Rehber Ol" icon="ios-home" onSelect={() => { requestAnimationFrame(() => props.navigation.navigate("BeGuide")) }} />
            <AccountSettingsList style={styles.title} title="Çıkış Yap" onSelect={() => {
                dispatch(authActions.logOut())

            }} />               
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
        marginLeft: Dimensions.get("window").width * 0.04,
        overflow:"hidden"
    },
    settingsContainer: {
        paddingHorizontal: Dimensions.get("window").width * 0.08,
        paddingTop: Dimensions.get("window").height * 0.05
    },
    name: {
        fontSize: 24
    },
    settings: {
        color: "grey",
        fontFamily: "open-sans",
        fontSize: 14
    },
    title: {
        color: "red"
    },
    pImage: {
        height: "100%",
        width: "100%"
    },
    centered:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default ProfileScreen