import React, { useEffect, useCallback, useReducer, useState } from "react"
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Alert, KeyboardAvoidingView, ActivityIndicator, TouchableWithoutFeedback, Keyboard, AsyncStorage } from "react-native"


import NameInput from "../components/NameInput"
import { useSelector, useDispatch } from "react-redux"
import * as tourActions from "../store/actions/tour"
import ImgPicker from "../components/ImagePicker"
import firebase from "../firebase/firebase"
import CustomButton from "../components/CustomButton"

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
    return state;

}

const UserInputScreen = props => {

    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState()


    const profileState = props.navigation.getParam("profileState")
    const cityState = props.navigation.getParam("cityState")
    const categoryState = props.navigation.getParam("categoryState")

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            city: profileState.inputValues.city,
            cat: categoryState.inputValues.cat,
            tourName: cityState.inputValues.tourName,
            fname: profileState.inputValues.fname,
            phone: profileState.inputValues.phone,
            profileImg: profileState.inputValues.profileImg,
            catLabel: "",
            cityLabel: cityState.inputValues.cityLabel,
            image: "",
            hours: categoryState.inputValues.hours,
            price: categoryState.inputValues.price,
            groupSize: categoryState.inputValues.groupSize,
            language: cityState.inputValues.language,
            personalInfo: profileState.inputValues.personalInfo,
            details: cityState.inputValues.details,
            isNatural: false,
            isCultural: false,
            isPhotography: false,
            isNightlife: false
        },
        inputValidities: {
            city: profileState.inputValidities.city,
            cat: categoryState.inputValidities.cat,
            tourName: cityState.inputValidities.tourName,
            fname: profileState.inputValidities.fname,
            phone: profileState.inputValidities.phone,
            profileImg: profileState.inputValidities.profileImg,
            catLabel: true,
            cityLabel: true,
            image: true,
            hours: categoryState.inputValidities.hours,
            price: categoryState.inputValidities.price,
            groupSize: categoryState.inputValidities.groupSize,
            language: cityState.inputValidities.language,
            personalInfo: profileState.inputValidities.personalInfo,
            details: cityState.inputValidities.details,
            isNatural: true,
            isCultural: true,
            isPhotography: true,
            isNightlife: true
        },
        formIsValid: false
    })




    const selectedCategory = useSelector(state => state.tours.findCat)

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong Input", "Please Check The Errors In The Form", [{ text: "Okay!" }])
            return;
        }
        dispatch(tourActions.createTour(formState.inputValues.city, formState.inputValues.cat, formState.inputValues.fname, 
            formState.inputValues.phone, formState.inputValues.profileImg, formState.inputValues.image,
            formState.inputValues.tourName, +formState.inputValues.hours, formState.inputValues.language, formState.inputValues.cityLabel, formState.inputValues.catLabel, +formState.inputValues.price,
            formState.inputValues.details, +formState.inputValues.groupSize, formState.inputValues.personalInfo,
            formState.inputValues.isNatural, formState.inputValues.isCultural, formState.inputValues.isPhotography, formState.inputValues.isNightlife))
        props.navigation.navigate("BeGuide")
    }, [dispatch, formState, onTakenHandler])

    // useEffect(() => {
    //     props.navigation.setParams({
    //         submit: submitHandler
    //     })
    //     console.log(formState)
    // }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])



    const loadCat = useCallback(async () => {
        setError(null)
        try {
            await dispatch(tourActions.setCat(categoryState.inputValues.cat))
        } catch (err) {
            setError(err.message)
        }

    }, [dispatch, setError,])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener("willFocus", loadCat)

        return () => {
            willFocusSub.remove()
        }

    }, [loadCat])


    useEffect(() => {
        loadCat().then(() => {
            setIsLoading(false)
        })

    }, [dispatch, loadCat, inputChangeHandler, onTakenHandler])

    const onTakenHandler = useCallback(async (imagePath) => {

        const userData = await AsyncStorage.getItem("userData")
        const transformedData = JSON.parse(userData)
        const {token, userId, expiryDate} = transformedData


        inputChangeHandler("image", imagePath, true)

        const fileName = imagePath.split('/').pop()
        const response = await fetch(imagePath)
        const blob = await response.blob()
        var ref = firebase.storage().ref().child(`images/${userId}/` + `${fileName}`)
        return ref.put(blob)
        
    })

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
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.form}>
                <CustomButton onSelect={submitHandler} title="Tur Oluştur"/>
                {/* <ImgPicker onImageTaken={onTakenHandler} aspect={[9,16]}/> */}

                <View style={{ marginTop: 1000 }}>
                    <NameInput
                        editable={false}
                        id="catLabel"
                        label="- Category Label"
                        errorText="Please enter a valid title"
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        initialValue={selectedCategory.categoryLabel}
                        initiallyValid={true}
                        initialTouch={true}
                    />
                    <NameInput
                        editable={false}
                        id="isNatural"
                        label="Doğa Gezintisi"
                        errorText="Please enter a valid title"
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        initialValue={selectedCategory.isNatural}
                        initiallyValid={true}
                        initialTouch={true}
                    />
                    <NameInput
                        editable={false}
                        id="isCultural"
                        label="- Kültür Gezintisi"
                        errorText="Please enter a valid title"
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        initialValue={selectedCategory.isCultural}
                        initiallyValid={true}
                        initialTouch={true}
                    />
                    <NameInput
                        editable={false}
                        id="isPhotography"
                        label="- City Label"
                        errorText="Please enter a valid title"
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        initialValue={selectedCategory.isPhotography}
                        initiallyValid={true}
                        initialTouch={true}
                    />
                    <NameInput
                        editable={false}
                        id="isNightlife"
                        label="- City Label"
                        errorText="Please enter a valid title"
                        autoCapitalize="words"
                        autoCorrect={true}
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        initialValue={selectedCategory.isNightlife}
                        initiallyValid={true}
                        initialTouch={true}
                    /></View>


                <TouchableOpacity style={{ padding: 10 }} onPress={submitHandler}><Text>Kaydet</Text></TouchableOpacity>

            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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