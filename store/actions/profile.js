
import firebase from "../../firebase/firebase"
export const CREATE_PROFILE = "CREATE_PROFILE"
export const SET_PROFILE = "SET_PROFILE"
export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const SET_SELECTED_PROFILE = "SET_SELECTED_PROFILE"
import Profile from "../../models/Profile"

export const createProfile = (fname, lname, gender, email, phone, photo) => {

    return async (dispatch, getState) => { 
        const token = getState().auth.token
        const userId = getState().auth.userId

        const fileName = photo.split('/').pop()

        const newPath = await firebase.storage().ref().child(`images/${userId}/${fileName}`).getDownloadURL()

        const response = await fetch(`https://rehber-2e983.firebaseio.com/user/${userId}/profile.json?auth=${token}`, {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fname, lname, gender, email, phone, photo:newPath
            })   
        })
        const resData = await response.json();
        dispatch({
            type: CREATE_PROFILE,
            id:resData.name,
            fname, lname, gender, email, phone, photo:newPath
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

export const setSelectedProfile = (ownerId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        try {
            const response = await fetch(
                `https://rehber-2e983.firebaseio.com/user/${ownerId}/profile.json?auth=${token}`
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedSelectedProfile = [];

            for (const key in resData) {
                loadedSelectedProfile.push(
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

            dispatch({ type: SET_SELECTED_PROFILE, selectedProfile: loadedSelectedProfile });
        } catch (err) {
            throw err;
        }
    };
}

export const updateProfile = (id, fname, lname, gender, email, phone, photo) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId

        

        let fileName;
        let newPath;

        if(photo.slice(0,5) === "https"){
            newPath = photo
        }else{
             fileName = photo.split('/').pop()
             newPath = await firebase.storage().ref().child(`images/${userId}/${fileName}`).getDownloadURL()
        }



        const response = await fetch(`https://rehber-2e983.firebaseio.com/user/${userId}/profile/${id}.json?auth=${token}`, {
            method: "PATCH",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fname, lname, gender, email, phone, photo:newPath
            })
        })
        if (!response.ok) {
            throw new Error("Something went wrong!")
        }
        dispatch({
            type: UPDATE_PROFILE,
            pid: id,
            fname, lname, gender, email, phone, photo:newPath

        })
    }
}
