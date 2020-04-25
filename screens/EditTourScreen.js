import React, { useState, useEffect, useCallback } from "react"
import { View, TextInput, StyleSheet, Text, ScrollView, Dimensions, Picker, TouchableOpacity,Alert } from "react-native"

import DefaultTitle from "../components/DefaultTitle"
import NameInput from "../components/NameInput"
import { useSelector, useDispatch } from "react-redux"
import * as tourActions from "../store/actions/tour"

import Colors from "../constants/Colors"

const EditTourScreen = props => {

    const dispatch = useDispatch()

    const tourId = props.navigation.getParam("tid")
    const editedTour = useSelector(state => state.tours.userTour.find(tour => tour.id === tourId))

    const [TourName, setTourName] = useState(editedTour.tourName)
    const [ProfileImg, setProfileImg] = useState(editedTour.profileImg)
    const [HeaderImage, setHeaderImage] = useState(editedTour.Image)
    const [Images, setImages] = useState(editedTour.tourImage)
    const [Hours, setHours] = useState(editedTour.time.toString())
    const [Price, setPrice] = useState(editedTour.price.toString())
    const [GroupSize, setGroupSize] = useState(editedTour.groupSize.toString())
    const [Language, setLanguage] = useState([...editedTour.language])
    const [PersonalInfo, setPersonalInfo] = useState(editedTour.personalDetail)
    const [Details, setDetails] = useState(editedTour.tourPlan)
    const [Natural, setNatural] = useState(false)
    const [Cultural, setCultural] = useState(false)
    const [Photography, setPhotography] = useState(false)
    const [Nightlife, setNightlife] = useState(false)
    


    const submitHandler = useCallback(() => {
        dispatch(tourActions.updateTour(tourId, ProfileImg, HeaderImage, Images, TourName,
             Hours, Language, Price, Details, GroupSize, PersonalInfo, Natural, Cultural, Photography, Nightlife))
        props.navigation.goBack()
    }, [dispatch, tourId, ProfileImg, HeaderImage, Images, TourName,
        Hours, Language, Price, Details, GroupSize, PersonalInfo, Natural, Cultural, Photography, Nightlife])

    // useEffect(() => {
    //     props.navigation.setParams({
    //         submit:submitHandler
    //     },[submitHandler])
    // })


    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Tur İsmi  </DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={(text) => setTourName(text)}
                        value={TourName}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Kapak Fotoğrafı</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={(text) => {setHeaderImage(text) }}
                        value={HeaderImage}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Detay Photos</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={(text) => { setImages(text)}}
                        value={Images}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Profil Fotoğrafı</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        onChangeText={() => { }}
                        value={ProfileImg}
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
                        onChangeText={(textInput) => { setPrice(textInput.replace(/[^0-9&,]/g, "")); }}
                        value={Price}
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Grup Büyüklüğü</DefaultTitle>
                    <NameInput
                        keyboardType="number-pad"
                        maxLength={3}
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
                        //onChangeText={(text) => {setLanguage(Language.concat(text)) }}
                        returnKeyType="next"
                        onEndEditing={(text) => setLanguage(Language.concat(text.nativeEvent.text))}
                        onSubmitEditing={() => console.log("onSubmitEditing")}
                        
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Diller</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        //onChangeText={(text) => {setLanguage(Language.concat([text])) }}
                        returnKeyType="next"
                        onEndEditing={(text) => setLanguage(Language.concat(text.nativeEvent.text))}
                        onSubmitEditing={() => console.log("onSubmitEditing")}
                        value={Language}
                        
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
                        value={PersonalInfo}
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
                        value={Details}
                    />
                </View>
                <TouchableOpacity style={{ padding: 10 }} onPress={submitHandler}><Text>Kaydet</Text></TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => console.log(editedTour)}><Text>Kaydet</Text></TouchableOpacity>
               
            </View>
        </ScrollView>
    )
}

EditTourScreen.navigationOptions = (navData) => {
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

export default EditTourScreen;