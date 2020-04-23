import React from "react";
import { View, Text, StyleSheet, Button, FlatList} from "react-native";
import { useSelector } from "react-redux"

import Favlist from "../components/FavList"


const FavoritesScreen = (props) => {

    const favTours = useSelector(state => state.favorites.favorites)

    const renderFavList = itemData => {
        return(
            <Favlist navigation={props.navigation}
            onSelect={() => {
                requestAnimationFrame(() => props.navigation.navigate("Detail", {
                    tourId: itemData.item.id
                }))
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
        <FlatList
            data={favTours}
            renderItem={renderFavList}
         />
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    }
})

export default FavoritesScreen;