import React, {useState} from "react";
import { View, Text, Image, Button, StyleSheet, Alert } from "react-native"
import * as ImagePicker from "expo-image-picker" 
import * as Permissions from "expo-permissions"

import Colors from "../constants/Colors";



const ImgPicker = props => {

    const [pickedImg, setPickedImg] = useState()

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
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true, //CROPS etc
            aspect:[16,9],
            quality: 0.5 // 0-1
        })
        setPickedImg(image.uri)
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImg ? <Text>No image picked yet</Text> :
                <Image style={styles.image} source={{uri: pickedImg}}/>}
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