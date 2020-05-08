import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import NameInput from "../components/NameInput"
import Colors from "../constants/Colors"
import { useDispatch } from "react-redux"
import * as authActions from "../store/actions/auth"


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



const AuthScreen = props => {

  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState()

  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  })

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured!", error, [{ text: "Okay" }])
    }
  }, [error])

  const authHandler = async () => {
    let action;
    let navigate;
    if (isSignUp) {
      action = authActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password)
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password)
        navigate = "Main"
    }
    setError(null)
    setIsLoading(true);
    try {
      await dispatch(action)
      props.navigation.navigate(navigate)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView

      style={styles.screen}
    >
      <LinearGradient colors={['#E0E2F0', '#6672B8']} style={styles.gradient}>
        <View style={styles.authContainer}>
          <ScrollView>
            <NameInput
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <NameInput
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
            {isLoading ? <ActivityIndicator size="small" color={Colors.detailbgColor} /> : 
            <Button title={isSignUp ? "Sign Up" : "Login"} color={Colors.detailbgColor} onPress={authHandler} />}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={isSignUp ? "Switch to Login" : "Switch to Sign Up"}
                color={Colors.accentColor}
                onPress={() => {
                  setIsSignUp(prevValue => !prevValue)
                }}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
