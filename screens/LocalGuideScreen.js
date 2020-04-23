import React from "react";
import {View, Text, StyleSheet, Dimensions} from "react-native"


import DefaultTitle from "../components/DefaultTitle"
import CustomButton from "../components/CustomButton"
import Colors from "../constants/Colors"

const LocalGuideScreen = (props) => {
    return(
        <View style={styles.screen}>
            <CustomButton onSelect={() => {
                requestAnimationFrame(() => {
                    props.navigation.navigate("UserInput")
                })
            }} title="Yeni Tur Oluştur" />
            <CustomButton onSelect={() => {
                requestAnimationFrame(() => {
                    props.navigation.navigate("MyTours")
                })
            }} title="Turları Düzenle" />
        </View>
    )
}

LocalGuideScreen.navigationOptions = (navData) => {
    return{
        headerTitle: () => <DefaultTitle style={{fontSize:22, color:"white"}}>Rehber Ol</DefaultTitle>,
        headerStyle:{
            backgroundColor: Colors.detailbgColor
        }
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:"center",
        paddingHorizontal: Dimensions.get("window").width * 0.05,
    },  
})

export default LocalGuideScreen