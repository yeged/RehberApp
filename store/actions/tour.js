

export const CREATE_TOUR = "CREATE_TOUR"
export const DELETE_TOUR = "DELETE_TOUR"
export const UPDATE_TOUR = "UPDATE_TOUR"
export const SET_TOUR = "SET_TOUR"
import Tour from "../../models/tours"

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
        await fetch(`https://rehber-2e983.firebaseio.com/tours/${tourId}.json`, {
            method: "DELETE",
        })
        dispatch({
            type: DELETE_TOUR,
            tid: tourId
        })

    }
}

export const updateTour = (id, profileImg, Image, tourImage, tourName, time, language, price, tourPlan, groupSize, personalDetail, isNatural, isCultural, isPhotography, isNightlife) => {

    return async dispatch => {

        await fetch(`https://rehber-2e983.firebaseio.com/tours/${id}.json`, {
            method: "PATCH",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                profileImg, Image, tourImage, tourName, time, language, price, tourPlan, groupSize, personalDetail
            })
        })

        dispatch({
            type: UPDATE_TOUR,
            tid: id,
            tourData: {
                profileImg, Image, tourImage, tourName, time, language, price, tourPlan, groupSize, personalDetail
            }

        })
    }

}