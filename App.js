import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from  "expo-font"
import { enableScreens } from "react-native-screens"
import { AppLoading } from "expo";
import { Provider } from "react-redux"
import { combineReducers, createStore } from "redux"

import TabNav from "./navigation/FirstAppNavigation"
import tourReducer from "./store/reducers/tour"

enableScreens(); //for better performance

const fetchLayout = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  })
}

const rootReducer = combineReducers({
  tours: tourReducer
})

const store = createStore(rootReducer)

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return <AppLoading startAsync={fetchLayout} onFinish={() => {setFontLoaded(true)}} />
  }

  return (
    <Provider store={store}>
      <TabNav />
      </Provider>
  );
}


