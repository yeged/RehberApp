import React from "react"

import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import {createDrawerNavigator} from "react-navigation-drawer"
import { createBottomTabNavigator } from "react-navigation-tabs" // FOR IOS UPDATES LATER
import { Ionicons } from "@expo/vector-icons"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"

import SearchScreen from "../screens/SearchScreen";
import CategoryScreen from "../screens/CategoryScreen"
import CityScreen from "../screens/CityScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import ProfileScreen from "../screens/ProfileScreen"
import DetailScreen from "../screens/DetailScreen"
import InformationScreen from "../screens/InformationScreen"
import LocalGuideScreen from "../screens/LocalGuideScreen"
import UserInputScreen from "../screens/UserInputScreen"
import MyToursScreen from "../screens/MyToursScreen"
import EditTourScreen from "../screens/EditTourScreen"
import FilterScreen from "../screens/FilterScreen"
import AuthScreen from "../screens/AuthScreen"
import StartupScreen from "../screens/StartupScreen"
import ApplyInfoScreen from "../screens/ApplyInfoScreen"
import Colors from "../constants/Colors"

const defaultStackNavOptions = {

    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#f5f5f5",
            elevation: 5
        },
        headerTintColor: "black",
    }
}
const SearchNavigator = createStackNavigator({
    Search: SearchScreen,
    Category: CategoryScreen,
    City: CityScreen,
    Detail: {screen:DetailScreen,
    navigationOptions:{
        tabBarVisible:false
    }},

}, defaultStackNavOptions)

const getTabBarVisible = (route) => {
    const routeName = route.state
      ?  route.state.routes[route.state.index].name
      : route.params?.screen || 'Search';
  
    if (routeName === 'Detail') {
      return false;
    }
    return true;
  }


const ProfileNavigator = createStackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Info: { screen: InformationScreen },
    BeGuide: { screen: LocalGuideScreen },
    UserInput: {screen:UserInputScreen},
    MyTours: {screen:MyToursScreen},
    EditTour: {screen: EditTourScreen}
}, defaultStackNavOptions)


const FavoritesNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    Detail: DetailScreen
}, defaultStackNavOptions)


const TabNav = createBottomTabNavigator({
    Keşfet: {
        screen: SearchNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-search" size={25} color={tabInfo.tintColor} />
            },
        }
    },
    Beğenilenler: {
        screen: FavoritesNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-heart-empty" size={25} color={tabInfo.tintColor} />
            },
        }
    },
    Profil: {
        screen: ProfileNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-person" size={25} color={tabInfo.tintColor} />
            },
            tabBarVisible: false //not good for Ios            
        }
    },

}, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor,
        inactiveTintColor: "black",
        barStyle: {
            backgroundColor: "white",
            elevation: 5
        }
    }
})

const FilterNavigator = createStackNavigator({
    Filters: FilterScreen
}, defaultStackNavOptions)

const MainNavigator = createDrawerNavigator({
    Tours:{screen:TabNav,
    navigationOptions:{
        drawerLabel:"Tours"
    }},
    Filters: FilterNavigator
},
{
    contentOptions:{
        activeTintColor: Colors.accentColor,
        labelStyle:{
            fontFamily:"open-sans-bold"
        }
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, defaultStackNavOptions)

const ApplyNavigator = createStackNavigator({
    ApplyInfo:ApplyInfoScreen,
},defaultStackNavOptions)

const MNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth:AuthNavigator,
    ApplyInfo:ApplyNavigator,
    Main: MainNavigator
})


export default createAppContainer(MNavigator);