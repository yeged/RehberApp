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
        const resData = await response.json()
        console.log(resData)

        if (!response.ok) {
            throw new Error("Something went wrong!")
        }

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
        const resData = await response.json()
        console.log(resData)

        if (!response.ok) {
            throw new Error("Something went wrong!")
        }

        dispatch({
            type: LOGIN,
        })
    }
}