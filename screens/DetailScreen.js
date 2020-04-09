import React from "react";
import { View, Text, StyleSheet, Button, Dimensions, ImageBackground, Image, ScrollView } from "react-native";
import HeaderButton from "../components/HeaderButton"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { useSelector } from "react-redux"

import Colors from "../constants/Colors"
import DefaultTitle from "../components/DefaultTitle"


const DetailScreen = (props) => {

    const tourId = props.navigation.getParam("tourId")

    const availableTours = useSelector(state => state.tours.tours)

    const selectedTour = availableTours.find(tour => tour.id === tourId)


    return (
        <View style={styles.screen}>
            <ScrollView>


                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectedTour.tourImage }} style={styles.image} />


                </View>
                <View style={styles.container}>
                    <View style={styles.tourDetailContainer}>
                        <DefaultTitle style={styles.categoryTitle}>{selectedTour.category}</DefaultTitle>
                        <DefaultTitle numberOfLines={4} style={styles.title}>{selectedTour.tourName}</DefaultTitle>
                        <Text style={styles.cityTitle}>{selectedTour.city}</Text>
                    </View>

                    <View style={styles.tourInfoContainer}>
                        <View >
                            <View style={styles.tourInfo}>
                                <DefaultTitle style={styles.infoHeader}>Süre</DefaultTitle>
                                <Text style={styles.infoText}>{selectedTour.time} Saat</Text>
                            </View>
                            <View>
                                <DefaultTitle style={styles.infoHeader}>Kişi Başı</DefaultTitle>
                                <Text style={styles.infoText}>{selectedTour.price} ₺</Text>

                            </View>
                        </View>
                        <View >
                            <View style={styles.tourInfo}>
                                <DefaultTitle style={styles.infoHeader}>Grup Büyüklüğü</DefaultTitle>
                                <Text style={styles.infoText}>{selectedTour.groupSize} Kişiye kadar</Text>
                            </View>
                            <View>
                                <DefaultTitle style={styles.infoHeader}>Sunduğu Diller</DefaultTitle>
                                {selectedTour.language.map(tour => <Text style={styles.infoText}>{tour},</Text>)}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.tourRoute}>
                    <DefaultTitle style={styles.routeTitle}>Neler Yapacaksınız</DefaultTitle>
                    <Text style={styles.description}>{selectedTour.tourPlan}</Text>
                </View>

                <View>
                    <DefaultTitle style={styles.tourTitle}>Ev Sahibiniz</DefaultTitle>
                    <View style={styles.profileImage}>
                        <Image style={styles.pImage} />
                    </View>
                    <DefaultTitle style={{ fontSize: 25 }}>Alice</DefaultTitle>
                    <Text style={styles.description}>{selectedTour.personalDetail}</Text>
                    <Button title="Ev sahibiyle iletişime geçin" />
                </View>

            </ScrollView>
        </View>
    )
}

DetailScreen.navigationOptions = navData => {
    return {
        headerTitle: () => null,
        headerStyle: {
            backgroundColor: Colors.detailbgColor
        },
        headerTintColor: "white",
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName="ios-heart-empty" iconSize={25} style={styles.headerStyle} color="white" />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    headerStyle: {
        paddingHorizontal: Dimensions.get("window").width * 0.05
    },
    container: {
        width: "100%",
        paddingHorizontal: Dimensions.get("window").width * 0.05,
        marginBottom: Dimensions.get("window").height * 0.08,
        backgroundColor: Colors.detailbgColor,

    },

    tourDetailContainer: {
        paddingVertical: Dimensions.get("window").height * 0.04,
        borderBottomWidth: 1,
        borderBottomColor: "grey",

    },
    categoryTitle: {
        lineHeight: 30,
        color: "white"
    },
    title: {
        lineHeight: 30,
        fontSize: 22,
        color: "white"
    },
    cityTitle: {
        lineHeight: 30,
        fontFamily: "open-sans",
        color: Colors.accentColor
    },


    tourInfoContainer: {
        paddingVertical: Dimensions.get("window").height * 0.06,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    tourInfo:{
        paddingVertical: Dimensions.get("window").height * 0.04,
    },
    infoHeader:{
        color: Colors.accentColor
    },
    infoText:{
        color:"white",
        fontFamily: "open-sans"
    },  

    imageContainer: {
        width: "100%"
    },
    image: {
        height: 300,
        width: "100%"
    },
    pImage: {
        height: 300,
        width: 300
    }

})



export default DetailScreen;