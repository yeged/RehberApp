import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from  "expo-font"
import { enableScreens } from "react-native-screens"
import { AppLoading } from "expo";

import TabNav from "./navigation/FirstAppNavigation"

enableScreens(); //for better performance

const fetchLayout = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return <AppLoading startAsync={fetchLayout} onFinish={() => {setFontLoaded(true)}} />
  }

  return (
      <TabNav />
  );
}


