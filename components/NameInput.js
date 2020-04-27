import React, {useReducer} from "react"
import { TextInput, StyleSheet, Dimensions, View, Text } from "react-native"

import DefaultTitle from "../components/DefaultTitle"

const INPUT_CHANGE = "INPUT_CHANGE"

const inputReducer = (state, action) => {
    switch(action.type){
        case INPUT_CHANGE:
            
        default:
            return state;
    }
}

const NameInput = (props) => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        
    })

    const textChangeHandler = text => {
        dispatch({
            type:INPUT_CHANGE,
            value:text,
            isValid: isValid
        })
    }


    return (
        <View style={styles.formControl}>
            <DefaultTitle style={styles.label}>{props.label}</DefaultTitle>
            <TextInput
                {...props}
                style={styles.input}
                value={formState.inputValues.tourName}
                onChangeText={textChangeHandler.bind(this, "tourName")}
            />
            {!formState.inputValidities.title && (<Text>{props.errorText}</Text>)}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    formControl: {
        width: "100%",
        paddingBottom: Dimensions.get("window").height * 0.04
    },
    label: {
        marginVertical: 4 // SONRA HALLET AMK
    }
})

export default NameInput;