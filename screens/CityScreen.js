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


            <GuideList navigation={props.navigation}
                onSelect={() => {
                    requestAnimationFrame(() => props.navigation.navigate("Detail"))
                }}
                name={itemData.item.tourName}
                time={itemData.item.time}
                price={itemData.item.price}
                target={itemData.item.category}
                img={itemData.item.Image} />

        )
    }

    return (
        <View style={styles.screen}>
            <SearchEngine />
            <View style={styles.textContainer}>
                <DefaultTitle style={styles.text}>xd İçin Öne Çıkan Rehberler</DefaultTitle>
            </View>
            <FlatList
                data={selectedCity}
                renderItem={toursHandler}
                numColumns={2}
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
        paddingBottom: Dimensions.get("window").height * 0.05
    },
    text: {
        fontSize: 24
    }
})

export default CityScreen;