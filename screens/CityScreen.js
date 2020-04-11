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

    const favTours = useSelector(state => state.tours.favorites)

    const toursHandler = itemData => {
        const isFavorite = favTours.some(tour => tour.id === itemData.item.id)
        return (
            <GuideList navigation={props.navigation}
                onSelect={() => {
                    requestAnimationFrame(() => props.navigation.navigate("Detail", {
                        tourId: itemData.item.id,
                        isFav: isFavorite
                    }))
                }}
                name={itemData.item.tourName}
                time={itemData.item.time}
                price={itemData.item.price}
                target={itemData.item.category}
                img={itemData.item.Image} />
        )
    }

    const renderHeader = () => {

        const cityHeader = props.navigation.getParam("cityHeader")

        return (
            <View>
                <SearchEngine />
                <View style={styles.textContainer}>
                    <DefaultTitle style={styles.text}>{cityHeader} İçin Öne Çıkan Rehberler</DefaultTitle>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>

            <FlatList
                data={selectedCity}
                renderItem={toursHandler}
                numColumns={2}
                ListHeaderComponent={renderHeader}
            />
        </View>
    )
}

CityScreen.navigationOptions = navData => {

    const cityHeader = navData.navigation.getParam("cityHeader")

    return ({
        headerTitle: cityHeader
    })
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    textContainer: {
        paddingHorizontal: Dimensions.get("window").width * 0.05,
    },
    text: {
        fontSize: 24
    }
})

export default CityScreen;