import React from "react";
import { View, StyleSheet, Dimensions, FlatList, } from "react-native";
import SearchEngine from "../components/SearchEngine"
import GuideList from "../components/GuideList";
import DefaultTitle from "../components/DefaultTitle"
import { useSelector } from "react-redux"


const CityScreen = (props) => {

    const provinceId = props.navigation.getParam("provinceId")

    const availableCity = useSelector(state => state.tours.tours)

    const selectedCity = availableCity.filter(city => city.tCityId.indexOf(provinceId) >= 0)

    const toursHandler = itemData => {
        return (
            <View>
            <SearchEngine />
            <View style={styles.textContainer}>
                <DefaultTitle style={styles.text}>{itemData.item.city} İçin Öne Çıkan Rehberler</DefaultTitle>
            </View>
            <GuideList navigation={props.navigation} 
            onSelect={() => {
                requestAnimationFrame (() => props.navigation.navigate("Detail"))
            }} 
            name={itemData.item.tourName} 
            time={itemData.item.time} 
            price={itemData.item.price} 
            target={itemData.item.category} 
            img={itemData.item.Image} />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <FlatList contentContainerStyle={styles.container}
                data={selectedCity}
                renderItem={toursHandler}
            />
        </View>
    )
}

CityScreen.navigationOptions = navData => {

    const cityHeader = navData.navigation.getParam("cityHeader")


    return({
        headerTitle: cityHeader
    })
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        flexDirection: "row",
        //flexWrap: "wrap",
        justifyContent: "space-between",
    },
    textContainer: {
        paddingHorizontal: Dimensions.get("window").width * 0.05,
    },
    text: {
        fontSize: 24
    }
})

export default CityScreen;