import React from "react"
import { View, TouchableOpacity, StyleSheet, Dimensions, Text, Image, ScrollView } from "react-native"


function CityList(props){
    return(
        <View style={styles.cityItem}>
            <TouchableOpacity activeOpacity={0.65} onPress={() => {
                requestAnimationFrame (() => props.navigation.navigate("City"))
            }}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                    <Image source={{uri: props.img}} style={styles.image} resizeMode="cover" />
                    </View>
                    <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.city}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    cityItem:{
        height: Dimensions.get("window").height * 0.26,
        width: Dimensions.get("window").width * 0.4,
        marginVertical: Dimensions.get("window").height * 0.03,
        marginHorizontal: Dimensions.get("window").height * 0.01,
        backgroundColor: "#f5f5f5",
        elevation: 3,
        borderWidth:1,
        borderRadius:20,
        overflow: "hidden",
        borderColor: "#ccc",
        
    },
    container:{
    },
    image:{
        width: Dimensions.get("window").width * 0.4,
        height: Dimensions.get("window").height * 0.2,
    },
    imageContainer:{
        height: "80%"
    },
    textContainer:{
        height: "20%",
        paddingHorizontal: Dimensions.get("window").width * 0.1,
        paddingVertical: 5
    },
    text:{
        fontFamily: "open-sans"
    }
})

export default CityList;