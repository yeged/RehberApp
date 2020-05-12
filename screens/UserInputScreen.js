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

const UserInputScreen = props => {

    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(true)

    
    const profileState = props.navigation.getParam("profileState")
    const cityState = props.navigation.getParam("cityState")
    const cityLabel = props.navigation.getParam("cityLabel")

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            city: cityState.inputValues.city,
            cat: "",
            tourName: cityState.inputValues.tourName,
            fname: profileState.inputValues.fname,
            phone: profileState.inputValues.phone,
            profileImg: profileState.inputValues.profileImg,
            headerImage: "",
            images: "",
            hours: "",
            price: "",
            groupSize: "",
            language: cityState.inputValues.language,
            personalInfo: profileState.inputValues.personalInfo,
            details: cityState.inputValues.details,
        },
        inputValidities: {
            city: cityState.inputValidities.city,
            cat: false,
            tourName: cityState.inputValidities.tourName,
            fname: profileState.inputValidities.fname,
            phone: profileState.inputValidities.phone,
            profileImg: profileState.inputValidities.profileImg,
            headerImage: false,
            images: false,
            hours: false,
            price: false,
            groupSize: false,
            language: cityState.inputValidities.language,
            personalInfo: profileState.inputValidities.personalInfo,
            details: cityState.inputValidities.details,
        },
        formIsValid: false
    })


    const availableCat = useSelector(state => state.tours.category)

   const selectedCat = useSelector(state => state.tours.findCat)

    let catLabel = ""

    if (selectedCat) {
        catLabel = selectedCat.categoryLabel
    }

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong Input", "Please Check The Errors In The Form", [{ text: "Okay!" }])
            return;
        }
        dispatch(tourActions.createTour(formState.inputValues.city, formState.inputValues.cat,formState.inputValues.fname,formState.inputValues.phone, formState.inputValues.profileImg, formState.inputValues.headerImage, formState.inputValues.images,
            formState.inputValues.tourName, +formState.inputValues.hours, formState.inputValues.language, cityLabel, catLabel, +formState.inputValues.price,
            formState.inputValues.details, +formState.inputValues.groupSize, formState.inputValues.personalInfo,
            selectedCat.isNatural, selectedCat.isCultural, selectedCat.isPhotography, selectedCat.isNightlife))
        props.navigation.navigate("BeGuide")
    }, [dispatch, formState, cityLabel, catLabel])

    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
        
    }, [submitHandler])

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
            await dispatch(tourActions.setCat(formState.inputValues.cat))
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

    }, [dispatch, loadCat])

    
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
                    
                    <View style={styles.fromControl}>
                        <DefaultTitle style={styles.label}>- Kategori</DefaultTitle>
                        <View style={styles.picker}>
                            <View style={styles.pickerContainer} >
                                <Picker selectedValue={formState.inputValues.cat} onValueChange={inputChangeHandler.bind(this, "cat")} prompt="Kategori">
                                    <Picker.Item label="Kategori Seçiniz " value={null} />
                                    {availableCat.map(tour => <Picker.Item label={tour.categoryLabel} value={tour.categoryId} />)}
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <NameInput
                        id="headerImage"
                        label="- Kapak Fotoğrafı"
                        errorText="Please enter a valid URL"
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                    />
                    <NameInput
                        id="images"
                        label="- Detay Photos"
                        errorText="Please enter a valid URL"
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                    />
                    <NameInput
                        id="hours"
                        label="- Saat"
                        errorText="Please enter a valid hour"
                        keyboardType="number-pad"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        min={1}
                        max={24}
                        onlyNumber
                    />
                    <NameInput
                        id="price"
                        label="- Fiyat"
                        errorText="Please enter a valid price"
                        keyboardType="decimal-pad"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        min={1}
                        max={9999}
                        minLength={1}
                        onlyNumber
                    />
                    <NameInput
                        id="groupSize"
                        label="- Grup Büyüklüğü"
                        errorText="Please enter a valid size"
                        keyboardType="number-pad"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        min={1}
                        max={20}
                        minLength={1}
                        onlyNumber
                    />
                
                    <TouchableOpacity style={{ padding: 10 }} onPress={submitHandler}><Text>Kaydet</Text></TouchableOpacity>

                </View>
            </ScrollView>
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