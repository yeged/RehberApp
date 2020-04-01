import React from "react"

import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"

import SearchScreen from "../screens/SearchScreen";
import CategoryScreen from "../screens/CategoryScreen"
import CityScreen from "../screens/CityScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import ProfileScreen from "../screens/ProfileScreen"
import DetailScreen from "../screens/DetailScreen"

const FirstNavigator = createStackNavigator({
    Search: SearchScreen,
    Category: CategoryScreen,
    Detail: DetailScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: "blue"
        },
        headerTintColor: "white"
    }
})

export default createAppContainer(FirstNavigator);