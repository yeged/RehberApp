export const SIGN_UP = "SIGN_UP"
export const LOGIN = "LOGIN"

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

        dispatch({
            type: SIGN_UP,
        })
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

        dispatch({
            type: LOGIN,
        })
    }
}