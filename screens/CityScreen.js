import React, {useState, useCallback, useEffect} from "react";
import { View, StyleSheet, Dimensions, FlatList, Platform, Text, Switch, Button } from "react-native";
import SearchEngine from "../components/SearchEngine"
import GuideList from "../components/GuideList";
import DefaultTitle from "../components/DefaultTitle"
import { useSelector, useDispatch } from "react-redux"
import {toggleFilter} from "../store/actions/tour"
import Colors from "../constants/Colors"
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton"



const CityScreen = (props) => {

    const dispatch = useDispatch()

    const [isNatural, setIsNatural] = useState(false);
    const [isCultural, setIsCultural] = useState(false);
    const [isPhotography, setIsPhotography] = useState(false);
    const [isNightlife, setIsNightlife] = useState(false);

    const provinceId = props.navigation.getParam("provinceId")

    const availableCity = useSelector(state => state.tours.filters)

    const selectedCity = availableCity.filter(city => city.tCityId.indexOf(provinceId) >= 0)

    const favTours = useSelector(state => state.tours.favorites)

    const {navigation} = props

    const saveFilters = useCallback(() => {
        const appliedFilters= {
            natural: isNatural,
            cultural: isCultural,
            photography: isPhotography,
            night: isNightlife
        }
        dispatch(toggleFilter(appliedFilters))
    }, [isNatural, isCultural, isPhotography, isNightlife])

    useEffect(() => {
        navigation.setParams({
            save:saveFilters
        })
    }, [saveFilters])

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
        headerTitle: cityHeader,
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconSize={26} title="menu" iconName="ios-menu" onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>
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
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 15,
        marginVertical: 10
    }
})

export default CityScreen;