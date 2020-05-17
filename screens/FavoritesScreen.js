import React, { useEffect, useCallback, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import *as favActions from "../store/actions/favorites"
import * as tourActions from "../store/actions/tour"
import Colors from "../constants/Colors"

import Favlist from "../components/FavList"


const FavoritesScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const favTours = useSelector(state => state.favorites.favorites)

    const dispatch = useDispatch()

    const {navigation} = props

    const loadTour = useCallback(async (itemData) => {
        try {
            await dispatch(tourActions.setTour())
        } catch (err) {
            throw err
        }
        requestAnimationFrame(() => navigation.navigate("Detail", {
            tourId: itemData.item.tourId,

        }))

    }, [dispatch, navigation])


    const loadFav = useCallback(async () => {
        setIsRefreshing(true)
        try {
            await dispatch(favActions.setFav())
        } catch (err) {
            throw err
        }
        setIsRefreshing(false)
    }, [dispatch])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener("willFocus", loadFav)
        return () => {
            willFocusSub.remove()
        }
    }, [loadFav])

    useEffect(() => {
        setIsLoading(true)
        loadFav().then(() => {
            setIsLoading(false)

        })
        
    }, [dispatch, loadFav])



    const renderFavList = itemData => {
        return (
            <Favlist navigation={props.navigation}
                onSelect={loadTour.bind(this, itemData)}
                name={itemData.item.tourName}
                time={itemData.item.time}
                price={+itemData.item.price}
                target={itemData.item.city}
                img={itemData.item.tourImage} />
        )
    }

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.detailbgColor} />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <FlatList
                onRefresh={loadFav}
                refreshing={isRefreshing}
                data={favTours}
                renderItem={renderFavList}
            />
        </View>
    )
}

FavoritesScreen.navigationOptions = (navData) => {
    return{
        headerTitle: "Beğenilenler",    
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    centered:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default FavoritesScreen;