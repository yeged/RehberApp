import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button, Dimensions, Image, ScrollView, TouchableNativeFeedback, TouchableOpacity, ProgressViewIOSComponent } from "react-native";
import HeaderButton from "../components/HeaderButton"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { useSelector, useDispatch } from "react-redux"

import * as tourActions from "../store/actions/tour"
import Colors from "../constants/Colors"
import DefaultTitle from "../components/DefaultTitle"
import { addFav, setFav, deleteFav } from "../store/actions/favorites"
import CustomButton from "../components/CustomButton"





const DetailScreen = (props) => {

    const [tourReadMore, setTourReadMore] = useState();
    const [personReadMore, setPersonReadMore] = useState()
    const [showMore, setShowMore] = useState()
    const [showMoreInfo, setShowMoreInfo] = useState()
    

    const tourId = props.navigation.getParam("tourId")

    const favTour = useSelector(state => state.favorites.favorites)
    const tourIsFav = favTour.some(tour => tour.tourId === tourId)

    const availableTours = useSelector(state => state.tours.tours)

    const selectedTour = availableTours.find(tour => tour.id === tourId)


    // READ MORE SECTION
    const onTextLayout = useCallback(e => {
        setShowMore(e.nativeEvent.lines.length > 8);
    }, [showMore]);

    const onTextLayoutInfo = useCallback(e => {
        setShowMoreInfo(e.nativeEvent.lines.length > 8)
    }, [showMoreInfo])

    useEffect(() => {
        if (showMore) {
            return setTourReadMore(true)
        }

    }, [showMore])

    useEffect(() => {
        if (showMoreInfo) {
            return setPersonReadMore(true)
        }
    }, [showMoreInfo])

    const readMoreHandler = () => {
        tourReadMore ? setTourReadMore(false) : setTourReadMore(true)
    }

    const pReadMoreHandler = () => {
        personReadMore ? setPersonReadMore(false) : setPersonReadMore(true)
    }
    //////////////////////////////////

    //REDUCER && ACTIONS

    const dispatch = useDispatch()

    const loadFav = useCallback(async () => {
        try {
            await dispatch(setFav())

        } catch (err) {
            throw err
        }
        console.log("dispatch set fav")
    }, [dispatch, setFav])

    const favTourHandler = useCallback(async () => {
        try{
            await dispatch(addFav(tourId, selectedTour.tourName, selectedTour.time, selectedTour.price, selectedTour.Image, selectedTour.city))
        }catch(err){
            throw err
        }
        console.log("dispatch addFav")
    }, [addFav, dispatch])

    const favRemoveHandler = useCallback(async () => {
        const favId = favTour.find(value => value.tourId === tourId)
        try{
            await dispatch(deleteFav(favId.id))
        }catch(err){
            throw err
        }
        console.log("dispatch deletefav")
        console.log(favId)
    }, [deleteFav, dispatch])



    useEffect(() => {
        props.navigation.setParams({
            favTour: favHandler
        })
    }, [favTourHandler])

    useEffect(() => {
        props.navigation.setParams({
            isFav: tourIsFav
        })
    }, [tourIsFav])

    const favHandler = useCallback(async () => {
        loadFav()
        if (!tourIsFav) {
            favTourHandler()
        } else {
            favRemoveHandler()
        }
    }, [loadFav, favTourHandler, favRemoveHandler])

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectedTour.tourImage }} style={styles.image} />


                </View>
                <View style={styles.topContainer}>
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
                                <Text style={styles.infoText}>{selectedTour.language}</Text>
                                {/* {selectedTour.language.map(tour => <Text style={styles.infoText}>{tour},</Text>)} */}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.tourRoute}>
                        <DefaultTitle style={styles.tourTitle}>Neler Yapacaksınız</DefaultTitle>
                        <TouchableNativeFeedback useForeground onPress={readMoreHandler}>
                            <View>
                                <Text onTextLayout={onTextLayout} numberOfLines={tourReadMore ? 8 : null} style={styles.description}>{selectedTour.tourPlan}</Text>
                                <Text style={styles.readMore}>{showMore && tourReadMore ? "Daha Fazla" : null}</Text>

                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <View style={styles.tourPerson}>
                        <DefaultTitle style={styles.tourTitle}>Rehberiniz</DefaultTitle>
                        <View style={styles.profileImage}>
                            <Image style={styles.pImage} source={{ uri: selectedTour.profileImg }} />
                        </View>
                        <DefaultTitle style={{ fontSize: 25, lineHeight: Dimensions.get("window").height * 0.1 }}>{selectedTour.fname}</DefaultTitle>
                        <TouchableNativeFeedback useForeground onPress={pReadMoreHandler}>
                            <View>
                                <Text onTextLayout={onTextLayoutInfo} numberOfLines={personReadMore ? 8 : null} style={styles.description}>{selectedTour.personalDetail}</Text>
                                <Text style={styles.readMore}>{showMoreInfo && personReadMore ? "Daha Fazla" : null}</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <CustomButton title="Ev sahibiyle iletişime geçin" />
                    </View>
                </View>

                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item iconName={tourIsFav ? "ios-heart" : "ios-heart-empty"} iconSize={25} style={styles.headerStyle} color="white" onPress={favHandler} />
                </HeaderButtons>
            </ScrollView>
        </View>
    )
}

DetailScreen.navigationOptions = navData => {
    const favTour = navData.navigation.getParam("favTour")
    const isFav = navData.navigation.getParam("isFav")
    return {
        headerTitle: () => null,
        headerStyle: {
            backgroundColor: Colors.detailbgColor
        },
        headerTintColor: "white",
        headerTransparent: false,
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName={isFav ? "ios-heart" : "ios-heart-empty"} iconSize={25} style={styles.headerStyle} color="white" onPress={favTour} />
        </HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    headerStyle: {
        paddingHorizontal: Dimensions.get("window").width * 0.05
    },
    topContainer: {
        width: "100%",
        paddingHorizontal: Dimensions.get("window").width * 0.05,
        marginBottom: Dimensions.get("window").height * 0.04,
        backgroundColor: Colors.detailbgColor,

    },

    tourDetailContainer: {
        paddingTop: Dimensions.get("window").height * 0.04,
        paddingBottom: Dimensions.get("window").height * 0.02,
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor,

    },
    categoryTitle: {
        lineHeight: Dimensions.get("window").height * 0.06,
        color: "white"
    },
    title: {
        fontSize: 24,
        color: "white"
    },
    cityTitle: {
        lineHeight: Dimensions.get("window").height * 0.06,
        fontFamily: "open-sans",
        color: Colors.accent
    },


    tourInfoContainer: {
        paddingBottom: Dimensions.get("window").height * 0.05,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    tourInfo: {
        paddingVertical: Dimensions.get("window").height * 0.03,
    },
    infoHeader: {
        color: Colors.accent
    },
    infoText: {
        color: "white",
        fontFamily: "open-sans"
    },


    bottomContainer: {
        width: "100%",
        paddingHorizontal: Dimensions.get("window").width * 0.05,
    },
    tourRoute: {
        paddingBottom: Dimensions.get("window").height * 0.06,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    tourTitle: {
        fontSize: 20,
        lineHeight: Dimensions.get("window").height * 0.1,
        color: Colors.detailbgColor
    },
    description: {
        fontFamily: "open-sans",
    },
    readMore: {
        lineHeight: Dimensions.get("window").height * 0.04,
        color: Colors.accentColor
    },
    tourPerson: {
        paddingVertical: Dimensions.get("window").height * 0.05
    },


    imageContainer: {
        height: Dimensions.get("window").height * 0.65,
        width: "100%",
        backgroundColor: Colors.detailbgColor,


    },
    image: {
        height: "100%",
        width: "100%",

    },
    profileImage: {
        marginVertical: Dimensions.get("window").height * 0.024,
        borderRadius: Dimensions.get("window").height * 0.5,
        backgroundColor: "#505560",
        width: Dimensions.get("window").width * 0.44,
        height: Dimensions.get("window").height * 0.24,
        overflow: "hidden"
    },
    pImage: {
        height: "100%",
        width: "100%"
    }

})



export default DetailScreen;