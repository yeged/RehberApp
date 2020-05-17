import React, { useEffect, useCallback, useReducer, useState } from "react"
import { View, StyleSheet, Text, ScrollView, Dimensions, Picker, TouchableOpacity, Alert, KeyboardAvoidingView, ActivityIndicator, Button } from "react-native"

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

const ThirdCreateTourScreen = props => {

    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    const profileState = props.navigation.getParam("profileState")
    const cityState = props.navigation.getParam("cityState")

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            cat: "",
            hours: "",
            price: "",
            groupSize: "",
 
        },
        inputValidities: {
            cat: false,
            hours: false,
            price: false,
            groupSize: false,
   
        },
        formIsValid: false
    })

    const availableCat = useSelector(state => state.tours.category)


    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong Input", "Please Check The Errors In The Form", [{ text: "Okay!" }])
            return;
        }
        props.navigation.replace("UserInput", {
            profileState: profileState,
            cityState: cityState,
            categoryState: formState
        })
        setIsLoading(true)
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

    }, [dispatch, loadCat, inputChangeHandler])



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
                    <View style={styles.fromControl}>
                        <DefaultTitle style={styles.label}>- Kategori</DefaultTitle>
                        <View style={styles.picker}>
                            <View style={styles.pickerContainer} >
                                <Picker selectedValue={formState.inputValues.cat} onValueChange={inputChangeHandler.bind(this, "cat")} prompt="Kategori">
                                    <Picker.Item label="Kategori Seçiniz " value={null} />
                                    {!isLoading && availableCat.map(tour => <Picker.Item label={tour.categoryLabel} value={tour.categoryId} />)}
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <NameInput
                        id="hours"
                        label="Saat"
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
                        label="Fiyat"
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
                        label="Grup Büyüklüğü"
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
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

ThirdCreateTourScreen.navigationOptions = (navData) => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTintColor: "white",
        headerTitle:null,
        headerRight: () => <TouchableOpacity style={{ padding: 10 }} onPress={submitFn}><Text style={{color:"white"}}>İlerle</Text></TouchableOpacity>,
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
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ThirdCreateTourScreen;