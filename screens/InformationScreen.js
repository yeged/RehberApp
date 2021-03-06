import React, { useState, useEffect, useCallback, useReducer } from "react"
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Picker, KeyboardAvoidingView, ScrollView, AsyncStorage } from "react-native"
import { useSelector, useDispatch } from "react-redux"

import DefaultTitle from "../components/DefaultTitle"
import NameInput from "../components/NameInput"
import * as profileActions from "../store/actions/profile"
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

const InformationScreen = (props) => {

    const [error, setError] = useState()

    const userProfile = useSelector(state => state.profile.profile)
    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            fname: userProfile[0].fname,
            lname: userProfile[0].lname,
            gender: userProfile[0].gender,
            email: userProfile[0].email,
            phone: userProfile[0].phone,
            photo: userProfile[0].photo
        },
        inputValidities: {
            fname: true,
            lname: true,
            gender: true,
            email: true,
            phone: true,
            photo: true
        },
        formIsValid: true
    })

    const submitHandler = useCallback(async () => {
        setError(null)

        try {
            await dispatch(profileActions.updateProfile(userProfile[0].id, formState.inputValues.fname, formState.inputValues.lname, formState.inputValues.gender,
                formState.inputValues.email, formState.inputValues.phone, formState.inputValues.photo))
            props.navigation.goBack()
        } catch (err) {
            setError(err.message)
        }


    }, [dispatch, formState])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            input: inputIdentifier,
            value: inputValue,
            isValid: inputValidity
        })
    }, [dispatchFormState])

    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
        console.log(formState.inputValues.photo.toString())
    }, [submitHandler])

    const onTakenHandler = useCallback(async (imagePath) => {


        const userData = await AsyncStorage.getItem("userData")
        const transformedData = JSON.parse(userData)
        const { token, userId, expiryDate } = transformedData

        let deleteFormStateImg = formState.inputValues.photo
        let deleteImg = firebase.storage().refFromURL(`${deleteFormStateImg}`)
        console.log("bu delete image")
        console.log(deleteImg)
        deleteImg.delete()

        inputChangeHandler("photo", imagePath, true)

        const fileName = imagePath.split('/').pop()
        const response = await fetch(imagePath)
        const blob = await response.blob()
        var ref = firebase.storage().ref().child(`images/${userId}/` + `${fileName}`)
        return ref.put(blob)


    })


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={500}>
            <ScrollView>
                <View style={styles.form}>
                    <NameInput
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
                        id="lname"
                        label="Soyad"
                        errorText="Please enter a valid last name"
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        minLength={2}
                        initialValue={userProfile[0].lname}
                        initiallyValid={!!userProfile}
                    />
                    <View style={styles.fromControl}>
                        <DefaultTitle style={styles.label}>Cinsiyet</DefaultTitle>
                        <View style={styles.picker}>
                            <View style={styles.pickerContainer} >
                                <Picker selectedValue={formState.inputValues.gender} onValueChange={inputChangeHandler.bind(this, "gender")} prompt="Cinsiyet" >
                                    <Picker.Item label="Cinsiyetiniz " value={null} />
                                    <Picker.Item label="Erkek" value="male" />
                                    <Picker.Item label="Kadin" value="female" />
                                    <Picker.Item label="Diğer" value="other" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <NameInput
                        editable={false}
                        id="email"
                        label="E-Mail"
                        keyboardType="email-address"
                        required
                        email
                        autoCapitalize="none"
                        errorText="Please enter a valid email address."
                        onInputChange={inputChangeHandler}
                        initialValue={userProfile[0].email}
                        initiallyValid={!!userProfile}
                    />
                    <NameInput
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
                        initialValue={userProfile[0].phone}
                        initiallyValid={!!userProfile}
                    />
                    <ImgPicker onImageTaken={onTakenHandler} aspect={[4, 3]} prevImg={formState.inputValues.photo} style={styles.prevImg} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

InformationScreen.navigationOptions = (navData) => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTintColor: "white",
        headerTitle: () => null,
        headerRight: () => <TouchableOpacity style={{ padding: 10 }} onPress={submitFn}><Text style={{color:"white"}}>Kaydet</Text></TouchableOpacity>,
        headerStyle: {
            backgroundColor: Colors.detailbgColor
        }
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
        width: "70%",
        height: Dimensions.get("window").height * 0.3,
        marginBottom: Dimensions.get("window").height * 0.05,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#ccc",
        borderRadius: Dimensions.get("window").height * 0.15,
        borderWidth: 1,
        overflow: "hidden"
    },
})

export default InformationScreen;