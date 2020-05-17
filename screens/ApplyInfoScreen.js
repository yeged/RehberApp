import React, { useEffect, useCallback, useReducer } from "react"
import { View, StyleSheet, Text, ScrollView, Dimensions, Picker, TouchableOpacity, Alert, KeyboardAvoidingView, AsyncStorage } from "react-native"

import DefaultTitle from "../components/DefaultTitle"
import NameInput from "../components/NameInput"
import { useDispatch } from "react-redux"
import * as profileActions from "../store/actions/profile"
import ImgPicker from "../components/ImagePicker"
import firebase from "../firebase/firebase"



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

const ApplyInfoScreen = props => {

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            fname: "",
            lname: "",
            gender: "",
            email: "",
            phone: "",
            photo: ""
        },
        inputValidities: {
            fname: false,
            lname: false,
            gender: false,
            email: true,
            phone: false,
            photo: false
        },
        formIsValid: false
    })


    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong Input", "Please Check The Errors In The Form", [{ text: "Okay!" }])
            return;
        }
        dispatch(profileActions.createProfile(formState.inputValues.fname, formState.inputValues.lname, formState.inputValues.gender,
            formState.inputValues.email, formState.inputValues.phone, formState.inputValues.photo))
        props.navigation.navigate("Search")
    }, [dispatch, formState])

    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
        console.log(formState.inputValues.email)
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])


    const onTakenHandler = useCallback(async (imagePath) => {

        const userData = await AsyncStorage.getItem("userData")
        const transformedData = JSON.parse(userData)
        const { token, userId,email, expiryDate } = transformedData

        inputChangeHandler("email", email, true)
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
                    />
                    <NameInput
                        id="lname"
                        label="Soyad"
                        errorText="Please enter a valid last name"

                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        minLength={2}
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
                    />
                    <ImgPicker onImageTaken={onTakenHandler} aspect={[4,3]} style={styles.prevImg} />

                    {/* <TouchableOpacity style={{ padding: 10 }} onPress={submitHandler}><Text>Kaydet</Text></TouchableOpacity> */}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

ApplyInfoScreen.navigationOptions = (navData) => {
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
    prevImg:{
        width: "70%",
        height: Dimensions.get("window").height * 0.3,
        marginBottom:Dimensions.get("window").height * 0.05,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#ccc",
        borderRadius:Dimensions.get("window").height * 0.15,
        borderWidth:1,
        overflow:"hidden"
    },
})

export default ApplyInfoScreen;