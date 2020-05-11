import React, { useState, useEffect, useCallback, useReducer } from "react"
import { View, TextInput, StyleSheet, Text, ScrollView, Dimensions, Picker, TouchableOpacity, Alert , KeyboardAvoidingView} from "react-native"

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

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

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

    useEffect(() => {
        if(error){
            Alert.alert("an error occured !", error, [{text: "Okay"}])
        }
    }, [error])

    const submitHandler = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try{
            await dispatch(tourActions.updateTour(tourId, formState.inputValues.profileImg, formState.inputValues.headerImage, formState.inputValues.images, formState.inputValues.tourName,
                formState.inputValues.hours, formState.inputValues.language, formState.inputValues.price, formState.inputValues.details, 
                formState.inputValues.groupSize, formState.inputValues.personalInfo, 
                formState.inputValues.natural, formState.inputValues.cultural, formState.inputValues.photography, formState.inputValues.nightlife))
            props.navigation.goBack()
        }catch(err){
            setError(err.message)
        }
        setIsLoading(false) 

    }, [dispatch, tourId, formState])

     useEffect(() => {
         props.navigation.setParams({
             submit:submitHandler
         })
     },[submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            input: inputIdentifier,
            value: inputValue,
            isValid: inputValidity
        })
    }, [dispatchFormState])

    return (
        <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={500}>
        <ScrollView>
            <View style={styles.form}>
            <NameInput
                    id="tourName"
                    label="- Tur İsmi"
                    errorText="Please enter a valid title"
                    autoCapitalize="words"
                    autoCorrect={true}
                    keyboardType="default"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    required
                    initialValue={editedTour.tourName}
                    initiallyValid={!!editedTour}
                />
                <NameInput
                    id="headerImage"
                    label="- Kapak Fotoğrafı"
                    errorText="Please enter a valid URL"
                    keyboardType="default"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    required
                    initialValue={editedTour.Image}
                    initiallyValid={!!editedTour}
                />
                <NameInput
                    id="images"
                    label="- Detay Photos"
                    errorText="Please enter a valid URL"
                    keyboardType="default"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editedTour.tourImage}
                    initiallyValid={!!editedTour}
                />
                <NameInput
                    id="profileImg"
                    label="- Profil Fotoğrafı"
                    errorText="Please enter a valid URL"
                    keyboardType="default"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    initialValue={editedTour.profileImg}
                    initiallyValid={!!editedTour}
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
                    initialValue={editedTour.time.toString()}
                    initiallyValid={!!editedTour}
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
                    initialValue={editedTour.price.toString()}
                    initiallyValid={!!editedTour}
           
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
                    initialValue={editedTour.groupSize.toString()}
                    initiallyValid={!!editedTour}
                />
                <NameInput
                    id="language"
                    label="- Diller"
                    errorText="Please enter a valid language"
                    autoCapitalize="words"
                    autoCorrect={true}
                    keyboardType="default"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    required
                    initialValue={editedTour.language}
                    initiallyValid={!!editedTour}
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
                    initialValue={editedTour.personalDetail}
                    initiallyValid={!!editedTour}
                />

                <NameInput
                    id="details"
                    label="- Yapılacaklar"
                    errorText="Please enter a valid details"
                    autoCapitalize="sentences"
                    autoCorrect={true}
                    keyboardType="default"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    required
                    multiline={true}
                    initialValue={editedTour.tourPlan}
                    initiallyValid={!!editedTour}
                />
                {/* <TouchableOpacity style={{ padding: 10 }} onPress={submitHandler}><Text>Kaydet</Text></TouchableOpacity> */}
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
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