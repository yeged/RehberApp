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
    City: CityScreen,
    Detail: DetailScreen,
    
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: "#f5f5f5",
            elevation: 5 
        },
        headerTintColor: "black"
    }
})



export default createAppContainer(FirstNavigator);