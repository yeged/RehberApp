import React, { useState } from "react"
import { View, TextInput, StyleSheet, Text, ScrollView, Dimensions, Picker, TouchableOpacity } from "react-native"

import DefaultTitle from "../components/DefaultTitle"
import NameInput from "../components/NameInput"
import { useSelector } from "react-redux"
import Colors from "../constants/Colors"

const UserInputScreen = props => {

    const [selectCity, setSelectCity] = useState("")
    const [selectCat, setSelectCat] = useState("")
    const [selectHours, setSelectHours] = useState("")
    const [selectPrice, setSelectPrice] = useState("")
    const [selectGroupSize, setSelectGroupSize] = useState("")


    const availableCity = useSelector(state => state.tours.city)
    const availableCat = useSelector(state => state.tours.category)

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Tur İsmi</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={() => { }}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Şehir</DefaultTitle>
                    <View style={styles.picker}>
                        <View style={styles.pickerContainer} >
                            <Picker selectedValue={selectCity} onValueChange={(itemValue, itemPosition) => { setSelectCity(itemValue) }} prompt="Şehir">
                                {availableCity.map(tour => <Picker.Item label={tour.cityLabel} value={tour.cityId} />)}
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Kategori</DefaultTitle>
                    <View style={styles.picker}>
                        <View style={styles.pickerContainer} >
                            <Picker selectedValue={selectCat} onValueChange={(itemValue, itemPosition) => { setSelectCat(itemValue) }} prompt="Kategori">
                                {availableCat.map(tour => <Picker.Item label={tour.categoryLabel} value={tour.categoryId} />)}
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Kapak Fotoğrafı</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={() => { }}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Detay Photos</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={() => { }}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Saat</DefaultTitle>
                    <NameInput
                        keyboardType="number-pad"
                        maxLength={1} // IF REHBER WANTS TO 10 HOURS TOUR THEN I WILL CHANGE THIS 
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={(textInput) => { setSelectHours(textInput.replace(/[^0-9]/g, "")); }}
                        value={selectHours}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Fiyat</DefaultTitle>
                    <NameInput
                        keyboardType="number-pad"
                        maxLength={5}
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={(textInput) => { setSelectPrice(textInput.replace(/[^0-9]/g, "")); }}
                        value={selectPrice}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Grup Büyüklüğü</DefaultTitle>
                    <NameInput
                        keyboardType="number-pad"
                        maxLength={2}
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={(textInput) => { setSelectGroupSize(textInput.replace(/[^0-9]/g, "")); }}
                        value={selectGroupSize}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Diller</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={() => { }}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Yapılacaklar</DefaultTitle>
                    <TextInput
                        style={styles.input}
                        blurOnSubmit={false}
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={() => { }}
                        multiline={true}
                    />

                </View>
            </View>
        </ScrollView>
    )
}

UserInputScreen.navigationOptions = (navData) => {
    return {
        headerRight: () => <TouchableOpacity style={{ padding: 10 }} onPress={() => console.log("sa")}><Text>Kaydet</Text></TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    form: {
        width: "100%",
        paddingHorizontal: Dimensions.get("window").width * 0.08,
        paddingTop: Dimensions.get("window").height * 0.04,
    },
    fromControl: {
        width: "100%",
        paddingBottom: Dimensions.get("window").height * 0.04
    },
    label: {
        marginVertical: 4 // SONRA HALLET AMK
    },
    input: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    pickerContainer: {
        marginHorizontal: Dimensions.get("window").width * -0.02
    },
    picker: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
})

export default UserInputScreen;