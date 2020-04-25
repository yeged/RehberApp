import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";

import DefaultTitle from "./DefaultTitle"

function Favlist(props) {
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity activeOpacity={0.65} onPress={props.onSelect} >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: props.img }} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                <DefaultTitle style={styles.target}>{props.target}</DefaultTitle>
                <View style={styles.nameContainer}>
                    <Text style={styles.name} numberOfLines={1}>{props.name}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price} numberOfLines={1} >{props.price.toFixed(2)} ₺/kişi'den itibaren </Text>
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
        height: Dimensions.get("window").height * 0.4,
        marginVertical: Dimensions.get("window").height * 0.01,
        marginHorizontal: Dimensions.get("window").height * 0.02,
        borderRadius:20,
        elevation: 5,
        backgroundColor: 'white'        
    },
    container:{
        
        borderRadius:20,
        overflow: "hidden",
    },  
    image: {
        width: "100%",
        height: "100%"
    },
    imageContainer:{
        width: "100%",
        height: "62%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden'
    },
    textContainer:{
        height:"38%",
        paddingVertical:Dimensions.get("window").height * 0.02,
        marginHorizontal: 8,
        alignItems: "center"
    },
    nameContainer:{
        marginVertical:Dimensions.get("window").height * 0.005,
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

export default Favlist;
