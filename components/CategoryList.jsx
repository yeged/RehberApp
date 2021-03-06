import React, {useEffect} from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions, Text, ImageBackground, ScrollView } from "react-native"
import DefaultTitle from "./DefaultTitle"
import Colors from "../constants/Colors"
import {useDispatch} from "react-redux"


const CategoryList = (props) => {


    return (
        <View style={styles.categoryItem}>
            <TouchableOpacity activeOpacity={0.65} onPress={props.onSelect}>
                <View style={styles.header}>
                    <ImageBackground source={{ uri: props.img }} style={styles.image} >
                        <View style={styles.titleContainer}>
                            <DefaultTitle style={styles.title}>
                                {props.title}
                            </DefaultTitle>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
            <View style={styles.detail}>
                <ScrollView>
                    <DefaultTitle style={{ fontSize: 16, color:Colors.accentColor }}>{props.title}</DefaultTitle>
                    <Text>{props.text}</Text>
                </ScrollView>
            </View>


        </View>

    )
}

const styles = StyleSheet.create({
    categoryItem: {
        height: Dimensions.get("window").height * 0.37,
        width: Dimensions.get("window").width * 0.89,
        marginVertical: Dimensions.get("window").height * 0.04,
        marginHorizontal: Dimensions.get("window").height * 0.012,
        backgroundColor: "#f5f5f5",
        elevation: 3,
        overflow: "hidden"
    },
    image: {
        width: Dimensions.get("window").width * 1,
        height: 170,
        justifyContent: "center"
    },
    header: {
        height: "70%",
    },
    detail: {
        height: "30%",
        paddingVertical: Dimensions.get("window").height * 0.01,
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: Dimensions.get("window").width * 0.02
    },
    titleContainer: {
        backgroundColor: "rgba(0,0,0,0)",
    },
    title: {
        color: "white",
        textAlign: "center"
    },
    text:{
        fontFamily: "open-sans"
    }
})

export default CategoryList;