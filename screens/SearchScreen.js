import React from "react";
import { View,Text,StyleSheet,Button } from "react-native";

import SearchEngine from "../components/SearchEngine"


const SearchScreen = (props) => {
    return(
        <View style={styles.screen}>
            <SearchEngine />
            <Text>Hellow</Text>
            <Button title="Hellow" onPress={() => {
                props.navigation.navigate("Category")
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SearchScreen;