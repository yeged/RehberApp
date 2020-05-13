import React, { useEffect, useCallback, useReducer, useState } from "react"
import { View, TextInput, StyleSheet, Text, ScrollView, Dimensions, Picker, TouchableOpacity, Alert, KeyboardAvoidingView, ActivityIndicator, Button, Modal } from "react-native"

import DefaultTitle from "../components/DefaultTitle"
import NameInput from "../components/NameInput"
import { useSelector, useDispatch } from "react-redux"
import * as tourActions from "../store/actions/tour"


import Colors from "../constants/Colors"
import ImgPicker from "../components/ImagePicker"

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
    return state;

}

const SecondCreateTourScreen = props => {

    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    const profileState = props.navigation.getParam("profileState")

    const selectedCity = useSelector(state => state.tours.findCity)

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            tourName: "",
            language: "",
            details: "",
            headerImage: "",
            cityLabel: "",
        },
        inputValidities: {
            tourName: false,
            language: false,
            details: false,
            headerImage: false,
            cityLabel: true,
        },
        formIsValid: false
    })




    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong Input", "Please Check The Errors In The Form", [{ text: "Okay!" }])
            return;
        }
        props.navigation.replace("ThirdCreate", {
            profileState: profileState,
            cityState: formState,
        })
        setIsLoading(true)
    }, [dispatch, formState])

    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
        console.log(selectedCity)
        console.log(formState)

    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])



    const loadCity = useCallback(async () => {
        setError(null)
        try {
            await dispatch(tourActions.setCity(profileState.inputValues.city))
        } catch (err) {
            setError(err.message)
        }

    }, [dispatch, setError,])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener("willFocus", loadCity)
        return () => {
            willFocusSub.remove()
        }
    }, [loadCity])


    useEffect(() => {
        loadCity().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadCity, inputChangeHandler])

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occured!</Text>
                <Button title="try again" onPress={loadCity} />
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.detailbgColor} />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={500}>
            <ScrollView>
                <View style={styles.form}>
                    <NameInput
                        editable={false}
                        id="cityLabel"
                        label="Şehir ID"
                        errorText="Please enter a valid title"
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        initialValue={selectedCity.cityLabel}
                        initiallyValid={true}
                        initialTouch={true}
                    />
                    <NameInput
                        id="tourName"
                        label="Tur İsmi"
                        errorText="Please enter a valid title"
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                    />
                    <NameInput
                        id="headerImage"
                        label="Kapak Fotoğrafı"
                        errorText="Please enter a valid URL"
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                    />

                    <NameInput
                        id="language"
                        label="Diller"
                        errorText="Please enter a valid language"
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                    />
                    <NameInput
                        id="details"
                        label="Yapılacaklar"
                        errorText="Please enter a valid details"
                        autoCapitalize="sentences"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        multiline={true}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

SecondCreateTourScreen.navigationOptions = (navData) => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerRight: () => <TouchableOpacity style={{ padding: 10 }} onPress={submitFn}><Text>İlerle</Text></TouchableOpacity>
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
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SecondCreateTourScreen;