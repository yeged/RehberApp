import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Picker, DatePickerAndroidOpenReturn } from "react-native"

import DefaultTitle from "../components/DefaultTitle"

const NameInput = (props) => {
    return (
        <TextInput {...props} style={{ ...styles.input, ...props.style }} />
    )
}

const InformationScreen = (props) => {
    const [selectedSex, setSelectedSex] = useState("")

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <DefaultTitle style={styles.title}>Kişisel Bilgileri Düzenle</DefaultTitle>
            </View>
            <View style={{ paddingBottom: Dimensions.get("window").height * 0.04 }}>
                <DefaultTitle>Ad</DefaultTitle>
                <NameInput
                    blurOnSubmit
                    autoCorrect={true}
                    autoCapitalize="words"
                    onChangeText={() => { }}
                    value="Yiğit Yavuz"
                />
            </View>
            <View style={{ paddingBottom: Dimensions.get("window").height * 0.04 }}>
                <DefaultTitle>Soyad</DefaultTitle>
                <NameInput
                    blurOnSubmit
                    autoCorrect={true}
                    autoCapitalize="words"
                    onChangeText={() => { }}
                    value="Ceylan"
                />
            </View>
            <View style={styles.pickerContainer}>
                <DefaultTitle>Cinsiyet</DefaultTitle>
                <View style={styles.picker} >
                <View style={styles.needSomePadding}>
                <Picker selectedValue={selectedSex} onValueChange={(itemValue, itemPosition) => { setSelectedSex(itemValue) }} prompt="Cinsiyet" >
                    <Picker.Item label="Erkek" value="male" />
                    <Picker.Item label="Kadin" value="female" />
                    <Picker.Item label="Diğer" value="other" />
                </Picker>
                </View>
                </View>
            </View>
            <View style={styles.pickerContainer}>
                <DefaultTitle>Doğum Tarihi</DefaultTitle>
            </View>
        </View>
    )
}

InformationScreen.navigationOptions = (navData) => {
    return {

        headerTitle: () => null,
        headerRight: () => <TouchableOpacity style={{ padding: 10 }} onPress={() => console.log("sa")}><Text>Kaydet</Text></TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: Dimensions.get("window").width * 0.08,
        paddingTop: Dimensions.get("window").height * 0.04,
    },
    input: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    titleContainer: {
        paddingBottom: Dimensions.get("window").height * 0.06
    },
    title: {
        fontSize: 30
    },
    pickerContainer: {
        paddingBottom: Dimensions.get("window").height * 0.04,
    },
    picker: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
     },
     needSomePadding:{
        marginHorizontal:Dimensions.get("window").width * -0.02
     }
})

export default InformationScreen;