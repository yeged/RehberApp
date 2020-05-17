import React, {useEffect, useState, useCallback} from "react";
import { View, StyleSheet, Dimensions, FlatList, Text, ActivityIndicator} from "react-native";
import GuideList from "../components/GuideList";
import DefaultTitle from "../components/DefaultTitle"
import { useSelector, useDispatch } from "react-redux"
import * as tourActions from "../store/actions/tour"
import Colors from "../constants/Colors";





const CategoryScreen = (props) => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState()

    const dispatch = useDispatch()


 
    const catId = props.navigation.getParam("catId")

    const availableTours = useSelector(state => state.tours.categorizedTour)

    
    const selectedCategory = availableTours
    const favTours = useSelector(state => state.favorites.favorites)
    
    const loadTour = useCallback( async () => {
        setError(null)
        setIsRefreshing(true)
        try{
            await dispatch(tourActions.setTour(catId))
        }catch(err){
            setError(err.message)
        }
        setIsRefreshing(false)
    }, [dispatch, setError, setIsRefreshing])


    useEffect(() => {
        const willFocusSub = props.navigation.addListener("willBlur", loadTour)
        
        return () => {
            willFocusSub.remove()
        }
    }, [loadTour])

    useEffect(() => {
        setIsLoading(true)
        loadTour().then(() => {
            setIsLoading(false)
        })
        
    }, [dispatch, loadTour])

    const toursHandler = (itemData) => {
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
                    target={itemData.item.city}
                    img={itemData.item.tourImage} />
        )
    }

    const renderHeader = () => {
        const catHeader =  props.navigation.getParam("catHeader")
        return(
            <View>
            <View style={styles.textContainer}>
                <DefaultTitle style={styles.text}>{catHeader} İçin Öne Çıkan Rehberler</DefaultTitle>
            </View>
            </View>
        )
    }

    

    if(error){
        return(
            <View style={styles.centered}>
                <Text>An Error Occured!</Text>
            </View>
        )
    }

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.detailbgColor} />
            </View>
        )
    }

    // if(!isLoading && selectedCategory.length===0){
    //     return(
    //         <View style={styles.centered}>
    //              <Text>No Tour Here </Text>
    //         </View>
    //     )
    // }

    return (
        <View style={styles.screen}>
            <FlatList 
                onRefresh={loadTour}
                refreshing={isRefreshing}
                data={selectedCategory}
                renderItem={toursHandler}
                numColumns={2}
                ListHeaderComponent={renderHeader}
            />
        </View>
    )
}

CategoryScreen.navigationOptions = (navData) => {

    const catHeader = navData.navigation.getParam("catHeader")

    return {
        headerTitle: catHeader
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical:Dimensions.get("window").height * 0.05
    },
    textContainer: {
        paddingHorizontal: Dimensions.get("window").width * 0.05,
    },
    text: {
        fontSize: 20
    },
    centered:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default CategoryScreen;