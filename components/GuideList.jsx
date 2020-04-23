import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";

import DefaultTitle from "./DefaultTitle"

function GuideList(props) {
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity activeOpacity={0.65} onPress={props.onSelect}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: props.img }} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                <DefaultTitle style={styles.target}>{props.target}</DefaultTitle>
                <View style={styles.nameContainer}>
                    <Text style={styles.name} numberOfLines={3}>{props.name}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price} numberOfLines={1} >{props.price} ₺/kişi'den itibaren </Text>
                </View>
                <Text style={styles.time}>{props.time} Saat </Text>
                </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#f5f5f5",
        width: Dimensions.get("window").width * 0.44,
        height: Dimensions.get("window").height * 0.57,
        marginVertical: Dimensions.get("window").height * 0.04,
        marginHorizontal: Dimensions.get("window").height * 0.015,
        borderWidth:1,
        borderColor:"#f5f5f5",
        borderRadius:20,
        overflow: "hidden",
    },
    container:{
       
    },  
    image: {
        width: "100%",
        height: "100%"
    },
    imageContainer:{
        height: "62%"
    },
    textContainer:{
        height:"38%",
        paddingVertical:Dimensions.get("window").height * 0.02,
        marginHorizontal: 8
    },
    nameContainer:{
        marginVertical:6,
    },
    time:{
        color:"grey"
    },
    name:{
        fontFamily: "open-sans",
        fontSize: 13
        
    },
    price:{
        fontFamily: "open-sans",
        fontSize: 13
    },
    target:{
        fontSize:12
    }

})

export default GuideList;
