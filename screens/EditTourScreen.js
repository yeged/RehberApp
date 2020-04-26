import React, { useState, useEffect, useCallback, useReducer } from "react"
import { View, TextInput, StyleSheet, Text, ScrollView, Dimensions, Picker, TouchableOpacity, Alert } from "react-native"

import DefaultTitle from "../components/DefaultTitle"
import NameInput from "../components/NameInput"
import { useSelector, useDispatch } from "react-redux"
import * as tourActions from "../store/actions/tour"

import Colors from "../constants/Colors"

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE"

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }

        return{
            formIsValid:updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues:updatedValues
        }
    }
}

const EditTourScreen = props => {

    const dispatch = useDispatch()

    const tourId = props.navigation.getParam("tid")
    const editedTour = useSelector(state => state.tours.userTour.find(tour => tour.id === tourId))


    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            tourName: editedTour.tourName,
            profileImg: editedTour.profileImg,
            headerImage: editedTour.Image,
            images: editedTour.tourImage,
            hours: editedTour.time.toString(),
            price: editedTour.price.toString(),
            groupSize: editedTour.groupSize.toString(),
            language: editedTour.language,
            personalInfo: editedTour.personalDetail,
            details: editedTour.tourPlan,
            natural: false,
            cultural: false,
            photography: false,
            nightlife: false,
        },
        inputValidities: {
            tourName: true,
            profileImg: true,
            headerImage: true,
            images: true,
            hours: true,
            price: true,
            groupSize: true,
            language: true,
            personalInfo: true,
            details: true,
        },
        formIsValid : true
    })


    const submitHandler = useCallback(() => {
        dispatch(tourActions.updateTour(tourId, formState.inputValues.profileImg, formState.inputValues.headerImage, formState.inputValues.images, formState.inputValues.tourName,
            formState.inputValues.hours, formState.inputValues.language, formState.inputValues.price, formState.inputValues.details, 
            formState.inputValues.groupSize, formState.inputValues.personalInfo, 
            formState.inputValues.natural, formState.inputValues.cultural, formState.inputValues.photography, formState.inputValues.nightlife))
        props.navigation.goBack()
    }, [dispatch, tourId, formState])

    // useEffect(() => {
    //     props.navigation.setParams({
    //         submit:submitHandler
    //     },[submitHandler])
    // })

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false
        if (text.trim().length > 0) {
            isValid = true
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            input: inputIdentifier,
            value: text,
            isValid: isValid
        })
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Tur İsmi  </DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        value={formState.inputValues.tourName}
                        onChangeText={textChangeHandler.bind(this, "tourName")}
                        
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Kapak Fotoğrafı</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        value={formState.inputValues.headerImage}
                        onChangeText={textChangeHandler.bind(this, "headerImage")}
                       
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Detay Photos</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        value={formState.inputValues.images}
                        onChangeText={textChangeHandler.bind(this, "images")}
                        
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Profil Fotoğrafı</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        value={formState.inputValues.profileImg}
                        onChangeText={textChangeHandler.bind(this, "profileImg")}
                        
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Saat</DefaultTitle>
                    <NameInput
                        keyboardType="number-pad"
                        maxLength={1} 
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        value={formState.inputValues.hours}
                        onChangeText={textChangeHandler.bind(this, "hours")}
                        
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
                        value={formState.inputValues.price}
                        onChangeText={textChangeHandler.bind(this, "price")}
                        
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
                        value={formState.inputValues.groupSize}
                        onChangeText={textChangeHandler.bind(this, "groupSize")}
                        
                    />
                </View>
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Diller</DefaultTitle>
                    <NameInput
                        blurOnSubmit
                        autoCorrect={true}
                        autoCapitalize="words"
                        value={formState.inputValues.language}
                        //onChangeText={(text) => {setLanguage(Language.concat(text)) }}
                        returnKeyType="next"
                        onEndEditing={textChangeHandler.bind(this, "language")}
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
                        value={formState.inputValues.personalInfo}
                        onChangeText={textChangeHandler.bind(this, "personalInfo")}
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
                        value={formState.inputValues.details}
                        onChangeText={textChangeHandler.bind(this, "details")}
                        multiline={true}
                        
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