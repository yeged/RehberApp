import React from "react"

import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs" // FOR IOS UPDATES LATER
import { Ionicons } from "@expo/vector-icons"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"

import SearchScreen from "../screens/SearchScreen";
import CategoryScreen from "../screens/CategoryScreen"
import CityScreen from "../screens/CityScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import ProfileScreen from "../screens/ProfileScreen"
import DetailScreen from "../screens/DetailScreen"

const defaultStackNavOptions = {

    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#f5f5f5",
            elevation: 5
        },
        headerTintColor: "black"
    }

}

const SearchNavigator = createStackNavigator({
    Search: SearchScreen,
    Category: CategoryScreen,
    City: CityScreen,
    Detail: DetailScreen,

}, defaultStackNavOptions)

const ProfileNavigator = createStackNavigator({
    Profile: {screen:ProfileScreen,
        navigationOptions:{
            headerShown:false,

        }
    },
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
            }
        }
    },
    Beğenilenler: {
        screen: FavoritesNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-heart-empty" size={25} color={tabInfo.tintColor} />
            }
        }
    },
    Profil: {
        screen: ProfileNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-person" size={25} color={tabInfo.tintColor}/>
            }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: "orange",
        inactiveTintColor: "black",
        barStyle: {
            backgroundColor: "white",
            elevation: 5
        }
    }
})

export default createAppContainer(TabNav);