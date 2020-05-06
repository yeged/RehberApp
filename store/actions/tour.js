

export const CREATE_TOUR = "CREATE_TOUR"
export const DELETE_TOUR = "DELETE_TOUR"
export const UPDATE_TOUR = "UPDATE_TOUR"

export const createTour = (tCityId, tCategoryId, profileImg, Image, tourImage, tourName, time, language, city, category, price, tourPlan, groupSize, personalDetail, isNatural, isCultural, isPhotography, isNightlife) => {
    return async dispatch => {

        const response = await fetch("https://rehber-2e983.firebaseio.com/tours.json", {
            method: "POST",
            header:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                tCityId, tCategoryId, profileImg, Image, tourImage, tourName, time, language, city, category, price, tourPlan, groupSize, personalDetail, isNatural, isCultural, isPhotography, isNightlife
            })
        })
        const resData = await response.json();
        
        dispatch({
            type: CREATE_TOUR,
            tourData: {
                id:resData.name,
                tCityId, tCategoryId, profileImg, Image, tourImage, tourName,
                time, language, city, category, price, tourPlan, groupSize,
                personalDetail, isNatural, isCultural, isPhotography, isNightlife
            }
        })
}};


export const deleteTour = (tourId) => {
    return {
        type: DELETE_TOUR,
        tid: tourId
    }
}

export const updateTour = (id, profileImg, Image, tourImage, tourName, time, language, price, tourPlan, groupSize, personalDetail, isNatural, isCultural, isPhotography, isNightlife) => {
    return {
        type: UPDATE_TOUR,
        tid: id,
        tourData: {
            profileImg, Image, tourImage, tourName, time, language, price, tourPlan, groupSize, personalDetail, isNatural, isCultural, isPhotography, isNightlife
        }

    }
}