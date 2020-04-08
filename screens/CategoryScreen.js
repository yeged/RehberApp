import React from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import SearchEngine from "../components/SearchEngine"
import GuideList from "../components/GuideList";
import DefaultTitle from "../components/DefaultTitle"
import { useSelector } from "react-redux"




const CategoryScreen = (props) => {


    const catId =   props.navigation.getParam("catId")
    

    const availableTours = useSelector(state => state.tours.tours)

    const selectedCategory = availableTours.filter(tour => tour.tCategoryId.indexOf(catId) >= 0)

    const toursHandler = (itemData) => {
        return(
            
            <GuideList navigation={props.navigation} 
            onSelect={() => {
                requestAnimationFrame (() => props.navigation.navigate("Detail"))
            }} 
            name={itemData.item.tourName} 
            time={itemData.item.time} 
            price={itemData.item.price} 
            target={itemData.item.city} 
            img={itemData.item.Image} />
        )
    }

    return (
        <View style={styles.screen}>
            <SearchEngine />
            <View style={styles.textContainer}>
                    <DefaultTitle style={styles.text}>Öne çıkan "Kültür" Gezintileri</DefaultTitle>
                </View>
            <FlatList contentContainerStyle={styles.container}
                data={selectedCategory}
                renderItem={toursHandler}
    
                 
            />
            
        </View>
    )
}

CategoryScreen.navigationOptions = (navData) => {

    const catHeader = navData.navigation.getParam("catHeader")

    return{
        headerTitle: catHeader
    }
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
    textContainer:{
        paddingHorizontal: Dimensions.get("window").width * 0.05,
        paddingBottom: Dimensions.get("window").height * 0.07
    },
    text:{
        fontSize:20
    }
})

export default CategoryScreen;