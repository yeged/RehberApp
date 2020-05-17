import React, { useState, useEffect, useCallback, useReducer } from "react"
import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Alert, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from "react-native"

import DefaultTitle from "../components/DefaultTitle"
import { useSelector, useDispatch } from "react-redux"
import * as tourActions from "../store/actions/tour"
import ImgPicker from "../components/ImagePicker"
import firebase from "../firebase/firebase"

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
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
}

const AddTourImgScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const dispatch = useDispatch()

    const tourId = props.navigation.getParam("tid")
    const editedTour = useSelector(state => state.tours.userTour.find(tour => tour.id === tourId))


    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            tourName: editedTour.tourName,
            profileImg: editedTour.profileImg,
            images: editedTour.tourImage,
            hours: editedTour.time.toString(),
            price: editedTour.price.toString(),
            groupSize: editedTour.groupSize.toString(),
            language: editedTour.language,
            personalInfo: editedTour.personalDetail,
            details: editedTour.tourPlan,
            phone: editedTour.phone,
            natural: false,
            cultural: false,
            photography: false,
            nightlife: false,
        },
        inputValidities: {
            tourName: true,
            profileImg: true,
            images: true,
            hours: true,
            price: true,
            groupSize: true,
            language: true,
            personalInfo: true,
            details: true,
            phone: true
        },
        formIsValid: true
    })

    useEffect(() => {
        if (error) {
            Alert.alert("an error occured !", error, [{ text: "Okay" }])
        }
    }, [error])

    const submitHandler = useCallback(async () => {
        setError(null)
        try {
            await dispatch(tourActions.updateTour(tourId, formState.inputValues.images, formState.inputValues.tourName,
                formState.inputValues.hours, formState.inputValues.language, formState.inputValues.price, formState.inputValues.details,
                formState.inputValues.groupSize, formState.inputValues.personalInfo, formState.inputValues.phone,
                formState.inputValues.natural, formState.inputValues.cultural, formState.inputValues.photography, formState.inputValues.nightlife))
            props.navigation.goBack()
        } catch (err) {
            setError(err.message)
        }

    }, [dispatch, tourId, formState])

    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
        console.log("-------")
        console.log("bu ")
        console.log(formState.inputValues.images)
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            input: inputIdentifier,
            value: inputValue, 
            isValid: inputValidity
        })
    }, [dispatchFormState])

    const onTakenHandler = useCallback(async (imagePath) => {
 

        const userData = await AsyncStorage.getItem("userData")
        const transformedData = JSON.parse(userData)
        const { token, userId, expiryDate } = transformedData

        let deleteFormStateImg = formState.inputValues.images
        if (deleteFormStateImg !== "") {
            let deleteImg = firebase.storage().refFromURL(`${deleteFormStateImg}`)
            deleteImg.delete()
        }

        inputChangeHandler("images", imagePath, true)
        setIsLoading(true)
        const fileName = imagePath.split('/').pop()
        const response = await fetch(imagePath)
        const blob = await response.blob()
        var ref = firebase.storage().ref().child(`images/${userId}/${tourId}/` + `${fileName}`)

        try {
            ref.put(blob)
            await firebase.storage().ref().child(`images/${userId}/${tourId}/${fileName}`).getDownloadURL().then(onResolve, onReject)
            function onResolve(foundURL){
                console.log(foundURL)
                setIsLoading(false)
            }
            function onReject(error){
                setIsLoading(true)
                console.log(error)
                onResolve()
            }
        } catch (err) {
            throw err
        }
    })

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={500}>
            <ScrollView>
                <View style={styles.form}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color={Colors.primary} />
                    ) :
                        <ImgPicker onImageTaken={onTakenHandler} aspect={[9, 16]} prevImg={formState.inputValues.images} style={styles.prevImg} />}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

AddTourImgScreen.navigationOptions = (navData) => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTintColor: "white",
        headerTitle: () => <DefaultTitle style={{ fontSize: 22, color: "white" }}>Tur Fotoğrafı Ekle</DefaultTitle>,
        headerStyle: {
            backgroundColor: Colors.detailbgColor
        },
        headerRight: () => <TouchableOpacity style={{ padding: 10 }} onPress={submitFn}><Text style={{ color: "white" }}>Kaydet</Text></TouchableOpacity>
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
    prevImg: {
        width: "80%",
        height: Dimensions.get("window").height * 0.7,
        marginBottom: Dimensions.get("window").height * 0.05,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1
    }
})

export default AddTourImgScreen;