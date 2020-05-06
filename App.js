import React, {useState} from 'react';
import * as Font from  "expo-font"
import { enableScreens } from "react-native-screens"
import { AppLoading } from "expo";
import { Provider } from "react-redux"
import { combineReducers, createStore, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"

import MainNavigator from "./navigation/FirstAppNavigation"
import tourReducer from "./store/reducers/tour"
import favoritesReducer from "./store/reducers/favorites"
import filterReducer from './store/reducers/filter';



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
  filters: filterReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return <AppLoading startAsync={fetchLayout} onFinish={() => {setFontLoaded(true)}} />
  }
  return (
    <Provider store={store}>
      <MainNavigator />
      </Provider>
  );
}


