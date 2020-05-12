import React, { useEffect, useCallback, useReducer, useState } from "react"
import { View, TextInput, StyleSheet, Text, ScrollView, Dimensions, Picker, TouchableOpacity, Alert, KeyboardAvoidingView, ActivityIndicator } from "react-native"

import DefaultTitle from "../components/DefaultTitle"
import NameInput from "../components/NameInput"
import { useSelector, useDispatch } from "react-redux"
import * as tourActions from "../store/actions/tour"
import * as profileActions from "../store/actions/profile"

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

const FirstCreateTourScreen = props => {

    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const userProfile = useSelector(state => state.profile.profile)

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            fname: userProfile[0].fname,
            phone: userProfile[0].phone,
            profileImg: userProfile[0].photo,
            personalInfo: "",

        },
        inputValidities: {
            fname: true,
            phone: true,
            profileImg: true,
            personalInfo: false,

        },
        formIsValid: false
    })


    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong Input", "Please Check The Errors In The Form", [{ text: "Okay!" }])
            return;
        }
        props.navigation.replace("SecondCreate", {
            profileState:formState
        })
    }, [dispatch, formState])

    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
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



    const loadProfile = useCallback(async () => {
        setError(null)
        try {
            await dispatch(profileActions.setProfile())
        } catch (err) {
            setError(err.message)
        }

    }, [dispatch, setError,])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener("willFocus", loadProfile)

        return () => {
            willFocusSub.remove()
        }

    }, [loadProfile])


    useEffect(() => {
        loadProfile().then(() => {
            setIsLoading(false)
        })

    }, [dispatch, loadProfile])

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occured!</Text>
                <Button title="try again" onPress={loadTour} />
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
                        id="fname"
                        label="İsim"
                        errorText="Please enter a valid first name"
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        minLength={2}
                        initialValue={userProfile[0].fname}
                        initiallyValid={!!userProfile}
                    />
                    <NameInput
                        editable={false}
                        id="phone"
                        label="- Telefon Numarası"
                        errorText="Please enter a valid phone number"
                        keyboardType="number-pad"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        minLength={11}
                        onlyNumber
                        maxLength={11}
                        initialValue={userProfile[0].phone.toString()}
                        initiallyValid={!!userProfile}
                    />
                    <NameInput
                        id="profileImg"
                        label="- Profil Fotoğrafı"
                        errorText="Please enter a valid URL"
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={userProfile[0].photo}
                        initiallyValid={!!userProfile}
                    />

                    <NameInput
                        id="personalInfo"
                        label="- Kişisel Bilgiler"
                        errorText="Please enter a valid information"
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

FirstCreateTourScreen.navigationOptions = (navData) => {
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

export default FirstCreateTourScreen;