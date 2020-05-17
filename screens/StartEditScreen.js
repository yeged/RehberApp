import React  from "react";
import { View, StyleSheet, Dimensions } from "react-native"


import DefaultTitle from "../components/DefaultTitle"
import CustomButton from "../components/CustomButton"
import Colors from "../constants/Colors"

const StartEditScreen = (props) => {

    const tourId = props.navigation.getParam("tid")


    return (
        <View style={styles.screen}>
            <CustomButton onSelect={() => {
                requestAnimationFrame(() => {
                    props.navigation.navigate("AddTourImg", {tid: tourId})
                })
            }} title="Tur Fotoğrafı Ekle" />
            <CustomButton onSelect={() => {
                requestAnimationFrame(() => {
                    props.navigation.navigate("EditTour", {tid: tourId})
                })
            }} title="Tur Bilgilerini Düzenle" />
        </View>
    )
}

StartEditScreen.navigationOptions = (navData) => {
    return {
        headerTintColor: "white",
        headerTitle: () => <DefaultTitle style={{ fontSize: 22, color: "white" }}>Düzenle</DefaultTitle>,
        headerStyle: {
            backgroundColor: Colors.detailbgColor
        }
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: Dimensions.get("window").width * 0.05,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default StartEditScreen