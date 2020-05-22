import React, {useState} from "react";
import { View, Text, Image, Button, StyleSheet, Alert, Dimensions } from "react-native"
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
        const image = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true, //CROPS etc
            aspect:props.aspect,
            quality: 0.3 // 0-1
        })
        console.log(image.uri)
        setPickedImg(image.uri)
        if(!image.cancelled){
            
        }   if(!image.cancelled){
            props.onImageTaken(image.uri)
        }
    }

    return (
        <View style={styles.imagePicker}>
            <View style={props.style}>
                {!pickedImg ? <Image style={styles.image} source={{uri: props.prevImg}}/> :
                <Image style={styles.image} source={{uri: pickedImg}}/>}
            </View>
            <Button title="Fotoğraf Ekle" color={Colors.detailbgColor} onPress={takeImageHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker:{
        alignItems: "center",
        marginBottom:15
    },
    imagePreview:{
        width: "100%",
        height: Dimensions.get("window").height * 0.3,
        marginBottom:Dimensions.get("window").height * 0.05,
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