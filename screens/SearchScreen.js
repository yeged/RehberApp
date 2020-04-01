import React from "react";
import { View,Text,StyleSheet,Button } from "react-native";

import SearchEngine from "../components/SearchEngine"
import DefaultTitle from "../components/DefaultTitle"


const SearchScreen = (props) => {
    return(
            <View style={styles.screen}>
            <SearchEngine />
            <View style= {styles.headerContainer}>
            <DefaultTitle>DENEME</DefaultTitle>
            </View>
            </View>     
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
    },
    headerContainer:{
        alignItems:"center",
    }
})

export default SearchScreen;