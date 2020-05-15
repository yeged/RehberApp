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
export const SET_FILTER = "SET_FILTER"

import firebase from "../../firebase/firebase"



export const toggleFilter = (filterSettings) => {
    return{
        type: SET_FILTER,
        filters: filterSettings
    }
}

export const setTour = (catId, cityId) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const response = await fetch("https://rehber-2e983.firebaseio.com/tours.json")
        try {

            if (!response.ok) {
                throw new Error("Something went wrong!")
            }
            const resData = await response.json();
            const loadedTours = []
            for (const key in resData) {
                loadedTours.push(new Tour(key, resData[key].tCityId, resData[key].tCategoryId, resData[key].ownerId,resData[key].fname, resData[key].phone, resData[key].profileImg, resData[key].Image, resData[key].tourImage,
                    resData[key].tourName, resData[key].time, resData[key].language, resData[key].city, resData[key].category, resData[key].price, resData[key].tourPlan,
                    resData[key].groupSize,  resData[key].personalDetail, resData[key].isNatural, resData[key].isCultural, resData[key].isPhotography, resData[key].isNightlife
                ))
            }
            dispatch({
                type: SET_TOUR,
                availableTours: loadedTours,
                userTour: loadedTours.filter(tour => tour.ownerId === userId),
                categorizedTour: loadedTours.filter(tour => tour.tCategoryId === catId),
                cityTour:loadedTours.filter(tour => tour.tCityId === cityId)
            })
        } catch (err) {
            throw err;
        }
    }
}

export const createTour = (tCityId, tCategoryId,fname, phone, profileImg, Image, tourImage, tourName, time, language, city, category, price, tourPlan, groupSize, personalDetail, isNatural, isCultural, isPhotography, isNightlife) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token 
        const userId = getState().auth.userId

        console.log(tourImage)
        
        const fileName = tourImage.split('/').pop()

        const newPath = await firebase.storage().ref().child(`images/${fileName}`).getDownloadURL()

        console.log("BU NEW PATH")
        console.log(newPath)



        const response = await fetch(`https://rehber-2e983.firebaseio.com/tours.json?auth=${token}`, {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tCityId, tCategoryId,ownerId:userId, fname, phone, profileImg, Image, tourImage:newPath, tourName, time, language, city, category, price, tourPlan, groupSize, personalDetail, isNatural, isCultural, isPhotography, isNightlife
            })
        })
        const resData = await response.json();

        dispatch({
            type: CREATE_TOUR,
            tourData: {
                id: resData.name,
                tCityId, tCategoryId,ownerId:userId, fname, phone, profileImg, Image, tourImage:newPath, tourName,
                time, language, city, category, price, tourPlan, groupSize,
                personalDetail, isNatural, isCultural, isPhotography, isNightlife
            }
        })
    }
};


export const deleteTour = (tourId) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token
        const response = await fetch(`https://rehber-2e983.firebaseio.com/tours/${tourId}.json?auth=${token}`, {
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

export const updateTour = (id, profileImg, Image, tourImage, tourName, time, language, price, tourPlan, groupSize, personalDetail) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token
        const response = await fetch(`https://rehber-2e983.firebaseio.com/tours/${id}.json?auth=${token}`, {
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

export const setCat = (id) => {
    return async dispatch => {
        const response = await fetch("https://rehber-2e983.firebaseio.com/categories.json")
        try {
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }
            const resData = await response.json()
            loadedCat = []
            for (const key in resData) {
                loadedCat.push(new Category(key, resData[key].categoryId, resData[key].categoryLabel, resData[key].categoryPhoto, resData[key].categoryText,
                    resData[key].isNatural, resData[key].isCultural, resData[key].isPhotography, resData[key].isNightlife))
            }
            const findCatIndex = loadedCat.filter(cat => cat.categoryId === id)
            const loadedCatIndex  = findCatIndex[0]
            dispatch({
                type: SET_CAT,
                availableCat: loadedCat,
                findCat: loadedCatIndex
                
            })
        } catch (err) {
            throw err
        }
    }
}

export const createCat = ( categoryId, categoryLabel, categoryPhoto, categoryText, isNatural, isCultural, isPhotography, isNightlife) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const response = await fetch(`https://rehber-2e983.firebaseio.com/categories.json?auth=${token}`, {
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


export const createCity = (cityId, cityLabel, cityPhoto) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const response = await fetch(`https://rehber-2e983.firebaseio.com/cities.json?auth=${token}`, {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cityId, cityLabel, cityPhoto
            })
        })
        const resData = await response.json();

        if (!response.ok) {
            throw new Error("Something went wrong!")
        }

        dispatch({
            type: CREATE_CITY,
            id: resData.name,
            tourData: {
                cityId, cityLabel, cityPhoto
            }
        })
    }
}

export const setCity = (id) => {
    return async (dispatch, getState) => {
        const response = await fetch("https://rehber-2e983.firebaseio.com/cities.json")
        try {
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }
            const resData = await response.json()
            loadedCity = []
            for (const key in resData) {
                loadedCity.push(new Province(key, resData[key].cityId, resData[key].cityLabel, resData[key].cityPhoto))
            }
            const findCityIndex = loadedCity.filter(city => city.cityId === id)
            const loadedCityIndex  = findCityIndex[0]
            dispatch({
                type: SET_CITY,
                availableCity: loadedCity,
                findCity: loadedCityIndex
            })
        } catch (err) {
            throw err
        }
    }
}