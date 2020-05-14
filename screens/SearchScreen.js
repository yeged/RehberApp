import React, { useEffect, useCallback, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, FlatList, ActivityIndicator, TouchableNativeFeedback, Text } from "react-native";

import SearchEngine from "../components/SearchEngine"
import DefaultTitle from "../components/DefaultTitle"
import CategoryList from "../components/CategoryList"
import CityList from "../components/CityList"
import { useSelector, useDispatch } from "react-redux"
import * as tourActions from "../store/actions/tour"
import Colors from "../constants/Colors"
import CustomButton from "../components/CustomButton"



const SearchScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    // const [error, setError] = useState()
    const [check, setCheck] = useState(false)


    const availableCategories = useSelector(state => state.tours.category)

    const availableCity = useSelector(state => state.tours.city)



    const dispatch = useDispatch()



    const loadCity = useCallback(async () => {
        try {
            await dispatch(tourActions.setCity("p1"))
        } catch (err) {
            throw err
        }
        setCheck(true)
    }, [dispatch])


    const loadCat = useCallback(async () => {
        try {
            await dispatch(tourActions.setCat())

        } catch (err) {
            throw err
        }
        setCheck(false)
    }, [dispatch])


    useEffect(() => {
        const willFocusSub = props.navigation.addListener("willFocus", loadCat)

        return () => {
            willFocusSub.remove()

        }
    }, [loadCat])

    useEffect(() => {
        setIsLoading(true)
        loadCat().then(() => {
            setIsLoading(false)

        })
    }, [dispatch, loadCat])


    //  useEffect(() => {
    //      setIsLoading(true)
    //      loadCity().then(() => {
    //          setIsLoading(false)
    //      })
    //  }, [dispatch, loadCity])


    const categoryHandler = itemData => {
        return (
            <CategoryList
                navigation={props.navigation}
                title={itemData.item.categoryLabel}
                text={itemData.item.categoryText}
                img={itemData.item.categoryPhoto}
                onSelect={() => {
                    requestAnimationFrame(() => props.navigation.navigate({
                        routeName: "Category", params: {
                            catId: itemData.item.categoryId,
                            catHeader: itemData.item.categoryLabel
                        }
                    }))
                }}
            />
        )
    }



    const cityHandler = itemData => {
        return (
            <CityList
                city={itemData.item.cityLabel}
                img={itemData.item.cityPhoto}
                onSelect={() => {
                    requestAnimationFrame(() => props.navigation.navigate("City", {
                        provinceId: itemData.item.cityId,
                        cityHeader: itemData.item.cityLabel
                    }))
                }}
                navigation={props.navigation}
            />
        )
    }


    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.detailbgColor} />
            </View>
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
                
                    <View style={styles.container}>
                    <TouchableNativeFeedback useForeground onPress={loadCity}>
                        <View style={styles.tab}>
                            <Text style={check ? styles.text : styles.text2}>Şehirler</Text>
                        </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback useForeground onPress={loadCat}>
                        <View style={styles.tab2}>
                            <Text style={!check ? styles.text : styles.text2}>Kategoriler</Text>
                        </View>
                        </TouchableNativeFeedback>
                    </View>
                
                <View style={styles.categoryContainer}>
                    {!check ? <FlatList
                        onRefresh={loadCat}
                        refreshing={isRefreshing}
                        keyExtractor={item => item.categoryId}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        snapToInterval={Dimensions.get("window").width * 0.93}
                        data={availableCategories}
                        renderItem={categoryHandler}
                    /> : <FlatList
                            onRefresh={loadCity}
                            refreshing={isRefreshing}
                            keyExtractor={item => item.cityId}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                            snapToInterval={Dimensions.get("window").width * 0.434}
                            data={availableCity}
                            renderItem={cityHandler}
                        />}
                </View>

                <View style={styles.needSomePaddingforBottom}>

                </View>
            </ScrollView>
        </View>
    )
}

SearchScreen.navigationOptions = (navData) => {
    return {
        headerTitle: () => <SearchEngine style={styles.search} navigation={navData.navigation} onSelect={() => navData.navigation.navigate("SearchEngineS")}/>
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
        paddingVertical: Dimensions.get("window").height * 0.035,

    },
    headerContainer: {
        alignItems: "center",
        padding: Dimensions.get("window").width * 0.04
    },
    title: {
        fontSize: Dimensions.get("window").width * 0.065
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
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderBottomWidth: 1,
        borderBottomColor:"#ccc",
        elevation:1,
        overflow: "hidden"
    },
    tab:{
        justifyContent:"flex-start",
        borderColor: "black",
        paddingVertical: Dimensions.get("window").height * 0.02,
        backgroundColor: "#f5f5f5",
        
    },
    tab2:{
        justifyContent:"flex-end",
        borderColor: "black",
        paddingVertical: Dimensions.get("window").height * 0.02,
        backgroundColor: "#f5f5f5",
    },

    text: {
        color:"black",
        fontFamily: "open-sans-bold",
        fontSize: 18
    },
    text2:{
        color:"black",
        fontFamily: "open-sans",
        fontSize: 18
    }
})

export default SearchScreen;