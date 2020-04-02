import React from "react";
import {Text, StyleSheet} from "react-native"


function DefaultTitle(props){
    return <Text style={{...styles.title, ...props.style}}>{props.children}</Text>
}

const styles = StyleSheet.create({
    title:{
        fontFamily:"open-sans-bold",
    }
})

export default DefaultTitle;