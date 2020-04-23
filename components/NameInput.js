import React from "react"
import { TextInput, StyleSheet } from "react-native"


const NameInput = (props) => {
    return (
        <TextInput {...props} style={{ ...styles.input, ...props.style }} />
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    }
})

export default NameInput;