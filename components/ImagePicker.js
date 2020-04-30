import React from "react";
import { View, Text, Image, Button, StyleSheet, Alert } from "react-native"
import * as ImagePicker from "expo-image-picker" 
import * as Permissions from "expo-permissions"

import Colors from "../constants/Colors";



const ImgPicker = props => {

    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        if(result.status !== "granted"){
            Alert.alert("Insufficient permission!", "You need to grant camera permissions to use this app.", [{text:"Okay"}])
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermission()
        if(!hasPermission){
            return;
        }
        ImagePicker.launchCameraAsync()
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                <Text></Text>
                <Image style={styles.image} />
            </View>
            <Button title="Take Image" color={Colors.detailbgColor} onPress={takeImageHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker:{
        alignItems: "center"
    },
    imagePreview:{
        width: "100%",
        height: 200,
        marginBottom:10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth:1
    },
    image:{
        width: "100%",
        height: "100%"
    }
})

export default ImgPicker;