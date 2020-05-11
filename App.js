import React, {useState} from 'react';
import * as Font from  "expo-font"
import { enableScreens } from "react-native-screens"
import { AppLoading } from "expo";
import { Provider } from "react-redux"
import { combineReducers, createStore, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"

import NavigationContainer from "./navigation/NavigationContainer"
import tourReducer from "./store/reducers/tour"
import authReducer from "./store/reducers/auth"
import favoritesReducer from "./store/reducers/favorites"
import profileReducer from "./store/reducers/profile"



enableScreens(); //for better performance

const fetchLayout = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  })
}

const rootReducer = combineReducers({
  tours: tourReducer,
  favorites: favoritesReducer,
  auth: authReducer,
  profile:profileReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return <AppLoading startAsync={fetchLayout} onFinish={() => {setFontLoaded(true)}} />
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
      </Provider>
  );
}


