import React from "react";
import { View, Text, StyleSheet, Button, Dimensions, ImageBackground, Image, ScrollView } from "react-native";
import HeaderButton from "../components/HeaderButton"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import {useSelector} from "react-redux"

import Colors from "../constants/Colors"
import DefaultTitle from "../components/DefaultTitle"


const DetailScreen = (props) => {

    const tourId = props.navigation.getParam("tourId")

    const availableTours = useSelector(state => state.tours.tours)

    const selectedTour = availableTours.find(tour => tour.id === tourId)


    return (
        <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container}>
            

                <View style={styles.imageContainer}>
                    <ImageBackground style={styles.image}>

                    </ImageBackground> 
                </View>

                <View style={styles.tourDetailContainer}>
                    <DefaultTitle style={styles.categoryTitle}>{selectedTour.category}</DefaultTitle>
                    <DefaultTitle style={styles.title}>{selectedTour.tourName}</DefaultTitle>
                    <Text style={styles.cityTitle}>{selectedTour.city}</Text>
                </View>

                <View style={styles.tourInfo}>
                    <View>
                        <DefaultTitle style={styles.timeText}>Süre</DefaultTitle>
                        <Text style={styles.timeText2}>{selectedTour.time} Saat</Text>
                    </View>
                    <View>
                        <DefaultTitle style={styles.group}>Grup Büyüklüğü</DefaultTitle>
                        <Text style={styles.group2}>{selectedTour.groupSize} Kişiye kadar</Text>
                    </View>
                    <View>
                        <DefaultTitle style={styles.price}>Kişi Başı</DefaultTitle>
                        <Text style={styles.price2}>{selectedTour.price}₺</Text>
                    </View>
                    <View>
                        <DefaultTitle style={styles.language}>Sunduğu Diller</DefaultTitle>
                        {selectedTour.language.map(tour => <Text style={styles.language2}>{tour}</Text> )}
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
                    <DefaultTitle style={{fontSize:25}}>Alice</DefaultTitle>
                    <Text style={styles.description}>{selectedTour.personalDetail}</Text>
                    <Button title="Ev sahibiyle iletişime geçin"/>
                </View>

                </ScrollView>
        </View>
    )
}

DetailScreen.navigationOptions = navData => {
    return {
        headerTitle: () => null,
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName="ios-heart-empty" iconSize={25} style={styles.headerStyle} />
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
    image:{
        height:300,
        width:300
    },
    pImage:{
        height:300,
        width:300
    }

})



export default DetailScreen;