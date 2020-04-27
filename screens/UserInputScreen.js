import React, { useEffect, useCallback, useReducer } from "react"
import { View, TextInput, StyleSheet, Text, ScrollView, Dimensions, Picker, TouchableOpacity, Alert } from "react-native"

import DefaultTitle from "../components/DefaultTitle"
import NameInput from "../components/NameInput"
import { useSelector, useDispatch } from "react-redux"
import * as tourActions from "../store/actions/tour"

import Colors from "../constants/Colors"
import { set } from "react-native-reanimated"

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

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            city: "",
            cat: "",
            tourName: "",
            profileImg: "",
            headerImage: "",
            images: "",
            hours: "",
            price: "",
            groupSize: "",
            language: "",
            personalInfo: "",
            details: "",
            natural: false,
            cultural: false,
            photography: false,
            nightlife: false,
        },
        inputValidities: {
            city: false,
            cat: false,
            tourName: false,
            profileImg: false,
            headerImage: false,
            images: false,
            hours: false,
            price: false,
            groupSize: false,
            language: false,
            personalInfo: false,
            details: false,
        },
        formIsValid: false
    })


    const availableCity = useSelector(state => state.tours.city)
    const availableCat = useSelector(state => state.tours.category)
    const tourss = useSelector(state => state.tours.tours)

    const selectedCity = availableCity.find(city => city.cityId === formState.inputValues.city)
    const selectedCat = availableCat.find(cat => cat.categoryId === formState.inputValues.cat)

    let cityLabel = ""
    let catLabel = ""

    if (selectedCity) {
        cityLabel = selectedCity.cityLabel
    }
    if (selectedCat) {
        catLabel = selectedCat.categoryLabel
    }

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong Input", "Please Check The Errors In The Form", [{ text: "Okay!" }])
            return;
        }
        dispatch(tourActions.createTour(formState.inputValues.city, formState.inputValues.cat, formState.inputValues.profileImg, formState.inputValues.headerImage, formState.inputValues.images,
            formState.inputValues.tourName, +formState.inputValues.hours, formState.inputValues.language, cityLabel, catLabel, +formState.inputValues.price,
            formState.inputValues.details, +formState.inputValues.groupSize, formState.inputValues.personalInfo,
            formState.inputValues.natural, formState.inputValues.cultural, formState.inputValues.photography, formState.inputValues.nightlife))
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

    return (
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
                />
                <View style={styles.fromControl}>
                    <DefaultTitle style={styles.label}>- Şehir</DefaultTitle>
                    <View style={styles.picker}>
                        <View style={styles.pickerContainer} >
                            <Picker selectedValue={formState.inputValues.city} onValueChange={inputChangeHandler.bind(this, "city")} prompt="Şehir">
                                <Picker.Item label="Şehir Seçiniz " value={null} />
                                {availableCity.map(tour => <Picker.Item label={tour.cityLabel} value={tour.cityId} />)}
                            </Picker>
                        </View>
                    </View>
                </View>
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
                    id="profileImg"
                    label="- Profil Fotoğrafı"
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
                //onChangeText={(textInput) => { setPrice(textInput.replace(/[^0-9&,]/g, "")); }}
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
                //onChangeText={(textInput) => { setGroupSize(textInput.replace(/[^0-9]/g, "")); }}
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
                />
                <TouchableOpacity style={{ padding: 10 }} onPress={submitHandler}><Text>Kaydet</Text></TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => console.log(formState.inputValues)}><Text>Kaydet</Text></TouchableOpacity>

            </View>
        </ScrollView>
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