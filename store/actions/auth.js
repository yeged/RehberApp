import { AsyncStorage } from "react-native"

export const AUTHENTICATE = "AUTHENTICATE"
export const LOGOUT = "LOGOUT"

let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({ type: AUTHENTICATE, userId: userId, token: token})
    }
}

export const signUp = (email, password) => {
    return async dispatch => {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8eaD13vTuodubThb03tHwK3eTFHJ83IY"
            , {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            })

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = "Something went wrong!"
            if (errorId === "EMAIL_EXISTS") {
                message = "This email exists already!"
            }
            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData)

        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
        saveDataToStorage(resData.idToken, resData.localId,resData.email, expirationDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8eaD13vTuodubThb03tHwK3eTFHJ83IY"
            , {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            })



        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = "Something went wrong!"
            if (errorId === "EMAIL_NOT_FOUND") {
                message = "This email could not be found!"
            } else if (errorId === "INVALID_PASSWORD") {
                message = "This password is not valid!"
            }

            throw new Error(message)
        }

        const resData = await response.json()

        dispatch(authenticate(resData.localId, resData.idToken,  parseInt(resData.expiresIn) * 1000))
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
        saveDataToStorage(resData.idToken, resData.localId,resData.email, expirationDate)
    }
}

export const logOut = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem("userData")
    return {
        type: LOGOUT
    }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = (expirationTime) => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logOut())
        }, expirationTime/2)
    }
}

const saveDataToStorage = (token, userId,email, expirationDate) => {
    AsyncStorage.setItem("userData", JSON.stringify({
        token: token,
        userId: userId,
        email:email,
        expiryDate: expirationDate.toISOString()
    }))
}

