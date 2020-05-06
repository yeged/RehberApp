import React, {useEffect} from "react";
import { View, StyleSheet, Dimensions, FlatList} from "react-native";
import SearchEngine from "../components/SearchEngine"
import GuideList from "../components/GuideList";
import DefaultTitle from "../components/DefaultTitle"
import { useSelector, useDispatch } from "react-redux"
import * as tourActions from "../store/actions/tour"




const CategoryScreen = (props) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(tourActions.setTour())
    }, [dispatch])
 
    const catId = props.navigation.getParam("catId")

    const availableTours = useSelector(state => state.tours.tours)

    const selectedCategory = availableTours.filter(tour => tour.tCategoryId.indexOf(catId) >= 0)

    const favTours = useSelector(state => state.favorites.favorites)

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
                    img={itemData.item.Image} />
        )
    }

    const renderHeader = () => {
        const catHeader =  props.navigation.getParam("catHeader")
        return(
            <View>
            <SearchEngine />
            <View style={styles.textContainer}>
                <DefaultTitle style={styles.text}>{catHeader} İçin Öne Çıkan Rehberler</DefaultTitle>
            </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <FlatList 
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
        flex: 1
    },
    textContainer: {
        paddingHorizontal: Dimensions.get("window").width * 0.05,
    },
    text: {
        fontSize: 20
    }
})

export default CategoryScreen;