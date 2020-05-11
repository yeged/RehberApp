
export const CREATE_PROFILE = "CREATE_PROFILE"
export const SET_PROFILE = "SET_PROFILE"
export const UPDATE_PROFILE = "UPDATE_PROFILE"
import Profile from "../../models/Profile"

export const createProfile = (fname, lname, gender, email, phone, photo) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        const response = await fetch(`https://rehber-2e983.firebaseio.com/user/${userId}/profile.json?auth=${token}`, {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fname, lname, gender, email, phone, photo
            })
        })
        const resData = await response.json();
        dispatch({
            type: CREATE_PROFILE,
            id:resData.name,
            fname, lname, gender, email, phone, photo
        })
    }
}

export const setProfile = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token
        try {
            const response = await fetch(
                `https://rehber-2e983.firebaseio.com/user/${userId}/profile.json?auth=${token}`
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProfile = [];

            for (const key in resData) {
                loadedProfile.push(
                    new Profile(
                        key,
                        resData[key].fname,
                        resData[key].lname,
                        resData[key].gender,
                        resData[key].email,
                        resData[key].phone,
                        resData[key].photo
                    )
                );
            }
            dispatch({ type: SET_PROFILE, profile: loadedProfile });
        } catch (err) {
            throw err;
        }
    };
}

export const updateTour = (id, fname, lname, gender, email, phone, photo) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        const response = await fetch(`https://rehber-2e983.firebaseio.com/user/${userId}/profile/${id}.json?auth=${token}`, {
            method: "PATCH",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fname, lname, gender, email, phone, photo
            })
        })
        if (!response.ok) {
            throw new Error("Something went wrong!")
        }
        dispatch({
            type: UPDATE_PROFILE,
            pid: id,
            fname, lname, gender, email, phone, photo

        })
    }
}
