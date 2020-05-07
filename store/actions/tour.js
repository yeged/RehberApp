import Tour from "../../models/tours"
import Category from "../../models/Category"
import Province from "../../models/City"

export const CREATE_TOUR = "CREATE_TOUR"
export const DELETE_TOUR = "DELETE_TOUR"
export const UPDATE_TOUR = "UPDATE_TOUR"
export const SET_TOUR = "SET_TOUR"
export const CREATE_CAT = "CREATE_CAT"
export const SET_CAT = "SET_CAT"
export const CREATE_CITY = "CREATE_CITY"
export const SET_CITY = "SET_CITY"




export const setTour = () => {
    return async dispatch => {
        const response = await fetch("https://rehber-2e983.firebaseio.com/tours.json")
        try {

            if (!response.ok) {
                throw new Error("Something went wrong!")
            }
            const resData = await response.json();
            const loadedTours = []
            for (const key in resData) {
                loadedTours.push(new Tour(key, resData[key].tCategoryId, resData[key].tCityId, "u1", resData[key].profileImg, resData[key].Image, resData[key].tourImage,
                    resData[key].tourName, resData[key].time, resData[key].language, resData[key].city, resData[key].category, resData[key].price, resData[key].tourPlan,
                    resData[key].groupSize, resData[key].userComment, resData[key].personalDetail, resData[key].isNatural, resData[key].isCultural, resData[key].isPhotography, resData[key].isNightlife
                ))
            }
            dispatch({
                type: SET_TOUR,
                availableTours: loadedTours
            })
        } catch (err) {
            throw err;
        }
    }
}

export const createTour = (tCityId, tCategoryId, profileImg, Image, tourImage, tourName, time, language, city, category, price, tourPlan, groupSize, personalDetail, isNatural, isCultural, isPhotography, isNightlife) => {
    return async dispatch => {

        const response = await fetch("https://rehber-2e983.firebaseio.com/tours.json", {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tCityId, tCategoryId, profileImg, Image, tourImage, tourName, time, language, city, category, price, tourPlan, groupSize, personalDetail, isNatural, isCultural, isPhotography, isNightlife
            })
        })
        const resData = await response.json();

        dispatch({
            type: CREATE_TOUR,
            tourData: {
                id: resData.name,
                tCityId, tCategoryId, profileImg, Image, tourImage, tourName,
                time, language, city, category, price, tourPlan, groupSize,
                personalDetail, isNatural, isCultural, isPhotography, isNightlife
            }
        })
    }
};


export const deleteTour = (tourId) => {

    return async dispatch => {
        const response = await fetch(`https://rehber-2e983.firebaseio.com/tours/${tourId}.json`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error("Something went wrong!")
        }
        dispatch({
            type: DELETE_TOUR,
            tid: tourId
        })
    }
}

export const updateTour = (id, profileImg, Image, tourImage, tourName, time, language, price, tourPlan, groupSize, personalDetail, isNatural, isCultural, isPhotography, isNightlife) => {

    return async dispatch => {

        const response = await fetch(`https://rehber-2e983.firebaseio.com/tours/${id}.json`, {
            method: "PATCH",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                profileImg, Image, tourImage, tourName, time, language, price, tourPlan, groupSize, personalDetail
            })
        })
        if (!response.ok) {
            throw new Error("Something went wrong!")
        }
        dispatch({
            type: UPDATE_TOUR,
            tid: id,
            tourData: {
                profileImg, Image, tourImage, tourName, time, language, price, tourPlan, groupSize, personalDetail
            }

        })
    }
}

export const setCat = () => {
    return async dispatch => {
        const response = await fetch("https://rehber-2e983.firebaseio.com/categories.json")
        try {
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }
            const resData = await response.json()
            loadedCat = []
            for (const key in resData) {
                loadedCat.push(new Category(resData[key].categoryId, resData[key].categoryLabel, resData[key].categoryPhoto, resData[key].categoryText,
                    resData[key].isNatural, resData[key].isCultural, resData[key].isPhotography, resData[key].isNightlife))
            }
            dispatch({
                type: SET_CAT,
                availableCat: loadedCat
            })
        } catch (err) {
            throw err
        }
    }
}

export const createCat = (categoryId, categoryLabel, categoryPhoto, categoryText, isNatural, isCultural, isPhotography, isNightlife) => {
    return async dispatch => {
        const response = await fetch("https://rehber-2e983.firebaseio.com/categories.json", {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                categoryId, categoryLabel, categoryPhoto, categoryText, isNatural, isCultural, isPhotography, isNightlife
            })
        })
        const resData = await response.json();

        if (!response.ok) {
            throw new Error("Something went wrong!")
        }

        dispatch({
            type: CREATE_CAT,
            id: resData.name,
            tourData: {
                categoryId,
                categoryLabel,
                categoryPhoto,
                categoryText,
                isNatural,
                isCultural,
                isPhotography,
                isNightlife
            }
        })
    }
}

export const setCity = () => {
    return async dispatch => {
        const response = await fetch("https://rehber-2e983.firebaseio.com/cities.json")
        try {
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }
            const resData = await response.json()
            loadedCity = []
            for (const key in resData) {
                loadedCity.push(new Province(resData[key].cityId, resData[key].cityLabel, resData[key].cityPhoto))
            }
            dispatch({
                type: SET_CITY,
                availableCity: loadedCity
            })
        } catch (err) {
            throw err
        }
    }
}