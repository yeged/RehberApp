import React, { useState, useEffect, useCallback } from "react"
import { View, TextInput, StyleSheet, Text, ScrollView, Dimensions, Picker, TouchableOpacity } from "react-native"

import DefaultTitle from "../components/DefaultTitle"
import NameInput from "../components/NameInput"
import { useSelector, useDispatch } from "react-redux"
import * as tourActions from "../store/actions/tour"

import Colors from "../constants/Colors"
import { set } from "react-native-reanimated"

const UserInputScreen = props => {

    const [City, setCity] = useState("")
    const [Cat, setCat] = useState("")
    const [TourName, setTourName] = useState("")
    const [ProfileImg, setProfileImg] = useState("")
    const [HeaderImage, setHeaderImage] = useState("")
    const [Images, setImages] = useState("")
    const [Hours, setHours] = useState("")
    const [Price, setPrice] = useState("")
    const [GroupSize, setGroupSize] = useState("")
    const [Language, setLanguage] = useState("")
    const [PersonalInfo, setPersonalInfo] = useState("")
    const [Details, setDetails] = useState("")
    const [Natural, setNatural] = useState(false)
    const [Cultural, setCultural] = useState(false)
    const [Photography, setPhotography] = useState(false)
    const [Nightlife, setNightlife] = useState(false)
    


    const availableCity = useSelector(state => state.tours.city)
    const availableCat = useSelector(state => state.tours.category)
    const tourss= useSelector(state => state.tours.tours)

    const selectedCity = availableCity.find(city => city.cityId === City)
    const selectedCat = availableCat.find(cat => cat.categoryId === Cat)

    let cityLabel = ""
    let catLabel = ""

    if(selectedCity){
        cityLabel = selectedCity.cityLabel
    }
    if(selectedCat){
        catLabel = selectedCat.categoryLabel
    }


    const dispatch = useDispatch()

    const submitHandler = useCallback(() => {
        dispatch(tourActions.createTour(City, Cat, ProfileImg, ProfileImg, HeaderImage, Images, TourName,
             Hours, Language, cityLabel, catLabel, Price, Details, GroupSize, PersonalInfo, Natural, Cultural, Photography, Nightlife))
    }, [dispatch, City, Cat, ProfileImg, ProfileImg, HeaderImage, Images, TourName,
        Hours, Language, cityLabel, catLabel, Price, Details, GroupSize, PersonalInfo, Natural, Cultural, Photography, Nightlife])

    // useEffect(() => {
    //     props.navigation.setParams({
    //         submit:submitHandler
    //     },[submitHandler])
    // })
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Tur İsmi </DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={(text) => {setTourName(text)}}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Şehir</DefaultTitle>
                    <View style={styles.picker}>
                        <View style={styles.pickerContainer} >
                            <Picker selectedValue={City} onValueChange={(itemValue, itemPosition) => { setCity(itemValue) }} prompt="Şehir">
                                <Picker.Item label="Şehir Seçiniz " value={null} />
                                {availableCity.map(tour => <Picker.Item label={tour.cityLabel} value={tour.cityId} />)}
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Kategori</DefaultTitle>
                    <View style={styles.picker}>
                        <View style={styles.pickerContainer} >
                            <Picker selectedValue={Cat} onValueChange={(itemValue, itemPosition) => { setCat(itemValue) }} prompt="Kategori">
                                <Picker.Item label="Kategori Seçiniz " value={null} />
                                {availableCat.map(tour => <Picker.Item  label={tour.categoryLabel} value={tour.categoryId} />)}
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
                        onChangeText={(text) => {setHeaderImage(text) }}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Detay Photos</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={(text) => { setImages(text)}}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Profil Fotoğrafı</DefaultTitle>
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
                        onChangeText={(textInput) => { setHours(textInput.replace(/[^0-9]/g, "")); }}
                        value={Hours}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Fiyat</DefaultTitle>
                    <NameInput
                        keyboardType="decimal-pad"
                        maxLength={5}
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={(textInput) => { setPrice(textInput.replace(/[^0-9]/g, "")); }}
                        value={Price}
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
                        onChangeText={(textInput) => { setGroupSize(textInput.replace(/[^0-9]/g, "")); }}
                        value={GroupSize}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Diller</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={(text) => {setLanguage(text) }}
                        returnKeyType="next"
                        onEndEditing={() => console.log("onEndEditing")}
                        onSubmitEditing={() => console.log("onSubmitEditing")}
                        
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Kişisel Bilgiler</DefaultTitle>
                    <TextInput
                        style={styles.input}
                        blurOnSubmit={false}
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={(text) => {setPersonalInfo(text) }}
                        multiline={true}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Yapılacaklar</DefaultTitle>
                    <TextInput
                        style={styles.input}
                        blurOnSubmit={false}
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={(text) => { setDetails(text)}}
                        multiline={true}
                    />
                </View>
                <TouchableOpacity style={{ padding: 10 }} onPress={submitHandler}><Text>Kaydet</Text></TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => console.log(tourss)}><Text>Kaydet</Text></TouchableOpacity>
               
            </View>
        </ScrollView>
    )
}

UserInputScreen.navigationOptions = (navData) => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerRight: () => <TouchableOpacity style={{ padding: 10 }} onPress={submitFn}><Text>Kaydet</Text></TouchableOpacity>
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