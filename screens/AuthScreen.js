import React from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import NameInput from "../components/NameInput"
import Colors from "../constants/Colors"

const AuthScreen = props => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
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
              onInputChange={() => {}}
              initialValue=""
            />
            <NameInput
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={() => {}}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button title="Login" color={Colors.detailbgColor} onPress={() => {}} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Switch to Sign Up"
                color={Colors.accentColor}
                onPress={() => {}}
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
