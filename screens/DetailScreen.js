import React from "react";
import { View,Text,StyleSheet,Button } from "react-native";
import HeaderButton from "../components/HeaderButton"
import { HeaderButtons, Item } from "react-navigation-header-buttons"


const DetailScreen = (props) => {
    return(
        <View style={styles.screen}>
            <Text>Hellow</Text>
        </View>
    )
}

DetailScreen.navigationOptions = navData => {
    return{
        headerTitle: () => null,
        headerTransparent:true,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName="ios-heart-empty" iconSize={25} />
        </HeaderButtons>
        
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }

})



export default DetailScreen;