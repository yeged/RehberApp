import React, {useEffect, useRef} from "react"
import {useSelector} from "react-redux"
import FirstAppNavigation from "./FirstAppNavigation"
import {NavigationActions} from "react-navigation"

const NavigationContainer = props => {
    const isAuth = useSelector(state => !!state.auth.token)
    const navRef = useRef()

    useEffect(() => {
        if(!isAuth){
            navRef.current.dispatch(NavigationActions.navigate({routeName: "Auth"}))
        }
    }, [isAuth])

    return <FirstAppNavigation ref={navRef} />
}

export default NavigationContainer