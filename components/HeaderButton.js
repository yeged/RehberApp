import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import {Ionicons} from "@expo/vector-icons"


function CustomHeaderButton(props){

    return(
        <HeaderButton {...props} IconComponent={Ionicons} />
    )
}

export default CustomHeaderButton;