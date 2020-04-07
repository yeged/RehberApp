import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, FlatList } from "react-native";

import SearchEngine from "../components/SearchEngine"
import DefaultTitle from "../components/DefaultTitle"
import CategoryList from "../components/CategoryList"
import CityList from "../components/CityList"
import { CATEGORIES, CITIES } from "../data/dummy-data"
import { useSelector } from "react-redux"



const SearchScreen = (props) => {

    const availableCategories = useSelector(state => state.tours.category)

    const availableCity = useSelector(state => state.tours.city)


    const categoryHandler = itemData => {
        return (
            <CategoryList navigation={props.navigation} title={itemData.item.categoryLabel} text={itemData.item.categoryText} img={itemData.item.categoryPhoto} />
        )
    }

    const cityHandler = itemData => {
        return (
            <CityList city={itemData.item.cityLabel} img={itemData.item.cityPhoto} navigation={props.navigation} />
        )
    }

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.nameContainer}>
                    <DefaultTitle style={styles.name}>Uygulamanın İsmi</DefaultTitle>
                </View>
                <View style={styles.headerContainer}>
                    <DefaultTitle style={styles.title}>Şehrin Rehberlerinden Benzersiz Etkinlikler</DefaultTitle>
                </View>
                <View style={styles.categoryContainer}>
                    <FlatList
                        keyExtractor={item => item.categoryId}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        snapToInterval={Dimensions.get("window").width * 0.93}
                        data={availableCategories}
                        renderItem={categoryHandler}
                    />
                </View>
                <View style={styles.headerContainer}>
                    <DefaultTitle style={styles.title}>Başka Şehirlerdeki Rehberler</DefaultTitle>
                </View>
                <View style={styles.needSomePaddingforBottom}>
                    <FlatList
                        keyExtractor={item => item.cityId}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        snapToInterval={Dimensions.get("window").width * 0.434}
                        data={availableCity}
                        renderItem={cityHandler}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

SearchScreen.navigationOptions = (navData) => {
    return {
        headerTitle: () => <SearchEngine style={styles.search} navigation={navData.navigation} />
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    },
    search: {
        marginHorizontal: Dimensions.get("window").width * 0.005,
    },
    categoryContainer: {
        paddingHorizontal: Dimensions.get("window").width * 0.01,
        paddingVertical: Dimensions.get("window").height * 0.035
    },
    headerContainer: {
        alignItems: "center",
        padding: Dimensions.get("window").width * 0.04
    },
    title: {
        fontSize: Dimensions.get("window").width * 0.085
    },
    nameContainer: {
        padding: Dimensions.get("window").width * 0.04,
        marginTop: Dimensions.get("window").height * 0.04
    },
    name: {
        color: "grey"
    },
    needSomePaddingforBottom: {
        paddingHorizontal: Dimensions.get("window").width * 0.01,
        paddingBottom: Dimensions.get("window").height * 0.1
    }
})

export default SearchScreen;