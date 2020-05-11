export const TOGGLE_FAV = "TOGGLE_FAV"
export const ADD_FAV = "ADD_FAV"
export const SET_FAV = "SET_FAV"
export const DELETE_FAV = "DELETE_FAV"
import Favorite from "../../models/Favorites"

export const addFav = (tourId, tourName, time, price, Image, city) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        const response = await fetch(`https://rehber-2e983.firebaseio.com/user/${userId}/favorites.json?auth=${token}`, {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tourId, tourName, time, price, Image, city
            })
        })
        const resData = await response.json();
        dispatch({
            type: ADD_FAV,
            id:resData.name,
            tourId: tourId,
            tourName: tourName,
            time: time,
            price: price,
            Image: Image,
            city: city
        })
    }
}

export const setFav = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token
        try {
            const response = await fetch(
                `https://rehber-2e983.firebaseio.com/user/${userId}/favorites.json?auth=${token}`
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedFavs = [];

            for (const key in resData) {
                loadedFavs.push(
                    new Favorite(
                        key,
                        resData[key].tourId,
                        resData[key].tourName,
                        resData[key].time,
                        resData[key].price,
                        resData[key].Image,
                        resData[key].city
                    )
                );
            }
            dispatch({ type: SET_FAV, favs: loadedFavs });
        } catch (err) {
            throw err;
        }
    };
}

export const deleteFav = (favId) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId;
        const response = await fetch(`https://rehber-2e983.firebaseio.com/user/${userId}/favorites/${favId}.json?auth=${token}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error("Something went wrong!")
        }
        dispatch({
            type: DELETE_FAV,
            fid: favId
        })
    }
}
